// Interactive CAD model viewer, reused across project pages that have a real
// export (Icarus nose cone/fins, Boite a bijoux). Same progressive-enhancement
// contract as GlassHero: no WebGL -> renders nothing, any error -> caught, falls
// back to whatever static image already sits next to the mount point in the page.
//
// .3mf files load as a positioned multi-part assembly (3MF preserves each part's
// transform from the original CAD assembly); plain .stl files are a single
// unpositioned mesh. A raw STL export per-part has no shared coordinate system --
// overlaying several of those directly produces a jumbled, misaligned mess, which
// is exactly what happened before switching to the .3mf export for the jewelry box.
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { ThreeMFLoader } from "three/addons/loaders/3MFLoader.js";
import { toCreasedNormals } from "three/addons/utils/BufferGeometryUtils.js";
import { Box3, MeshStandardMaterial, Quaternion, Vector3 } from "three";
import { supportsWebGL, ErrorBoundary } from "../shared/webgl.jsx";
import StudioEnvironment from "../shared/StudioEnvironment.jsx";

// Same material recipe (color, metalness, roughness) as GlassHero's glass --
// deliberately reused so the CAD viewer reads as part of the same visual family
// under the shared StudioEnvironment lighting, not a generic 3D-model-viewer
// widget with its own unrelated look (its previous flat ambient+directional
// light had no relationship to the hero's lighting at all).
const MATERIAL_PROPS = { color: "#c7ccd4", metalness: 0.3, roughness: 0.4, envMapIntensity: 1.1 };

function StlPart({ src, config }) {
  const raw = useLoader(STLLoader, src);
  // Smooth shading on curved surfaces (an STL has none), sharp edges kept.
  const geometry = useMemo(() => toCreasedNormals(raw, Math.PI / 6), [raw]);
  return (
    <mesh geometry={geometry} rotation={config?.zUp ? [-Math.PI / 2, 0, 0] : [0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial {...MATERIAL_PROPS} />
    </mesh>
  );
}

const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.min(1, Math.max(0, t));
const Z_AXIS = new Vector3(0, 0, 1);

// Turns an object about a vertical axis through (px, py), from its own loaded pose.
function swivel(object, base, [px, py], angle) {
  const q = new Quaternion().setFromAxisAngle(Z_AXIS, angle);
  object.position.copy(base.p).sub(new Vector3(px, py, 0)).applyQuaternion(q).add(new Vector3(px, py, 0));
  object.quaternion.copy(q).multiply(base.q);
}

// Two ways to animate a loaded 3MF, both driven by one 0..1 progress value:
//   "explode": each named part slides along its own offset vector (exploded <-> assembled);
//   "drawers": a latch rises, then two stacked drawers turn about a vertical pin, one each way.
// Parts are matched by the object names written in the 3MF file.
function ThreeMFAssembly({ src, mode, config, stateRef, reduced }) {
  const group = useLoader(ThreeMFLoader, src);
  const progress = useRef(null);
  const bases = useRef(new Map());

  const apply = (p) => {
    const e = smooth(clamp01(p));
    if (mode === "explode") {
      for (const [name, off] of Object.entries(config.offsets || {})) {
        for (const obj of group.children) {
          const b = bases.current.get(obj);
          if (obj.name === name && b) obj.position.copy(b.p).addScaledVector(new Vector3(...off), e);
        }
      }
    } else if (mode === "drawers") {
      // The latch rises first, then the two drawers turn about the central pin, one each way;
      // the top and bottom plates never move.
      const lift = smooth(clamp01(p / 0.35));
      const turn = smooth(clamp01((p - 0.25) / 0.75));
      for (const obj of group.children) {
        const b = bases.current.get(obj);
        if (!b) continue;
        if (config.latch.includes(obj.name)) obj.position.copy(b.p).add(new Vector3(0, 0, config.latchLift * lift));
        if (obj.name === config.drawers) {
          const sens = b.p.z < config.drawersSplitZ ? 1 : -1;
          swivel(obj, b, config.drawersPivot, (sens * config.drawersAngle * Math.PI * turn) / 180);
        }
      }
    }
  };

  useLayoutEffect(() => {
    group.children.forEach((obj) => {
      if (!bases.current.has(obj)) bases.current.set(obj, { p: obj.position.clone(), q: obj.quaternion.clone() });
      const color = config.colors?.[obj.name];
      obj.traverse((child) => {
        if (!child.isMesh) return;
        const props = color ? { ...MATERIAL_PROPS, color } : MATERIAL_PROPS;
        const wasArray = Array.isArray(child.material);
        const fresh = () => new MeshStandardMaterial(props);
        child.material = wasArray ? child.material.map(fresh) : fresh();
        child.castShadow = true;
        child.receiveShadow = true;
      });
    });
    progress.current = stateRef.current;
    apply(progress.current);
  }, [group]);

  useFrame((_, dt) => {
    if (progress.current === null) return;
    const target = stateRef.current;
    if (progress.current === target) return;
    progress.current = reduced ? target : progress.current + (target - progress.current) * Math.min(1, dt * 4.5);
    if (Math.abs(progress.current - target) < 0.002) progress.current = target;
    apply(progress.current);
  });

  // Models exported in 3MF are z-up; the scene is y-up.
  return <primitive object={group} rotation={config.zUp ? [-Math.PI / 2, 0, 0] : [0, 0, 0]} />;
}

function Model({ src, ...animation }) {
  return src.toLowerCase().endsWith(".3mf") ? <ThreeMFAssembly src={src} {...animation} /> : <StlPart src={src} config={animation.config} />;
}

// Positions the camera from the model's *actual* loaded size instead of a
// hardcoded distance (models loaded here range from a small printed part to a
// 170mm assembly) -- an elevated 3/4 "product shot" angle so both the top and a
// side wall are visible, rather than a flat, close-up crop on one smooth face.
function AutoFrameCamera({ groupRef, margin = 1.4 }) {
  const { camera } = useThree();
  const framed = useRef(false);
  useLayoutEffect(() => {
    if (framed.current || !groupRef.current) return;
    const box = new Box3().setFromObject(groupRef.current);
    const size = box.getSize(new Vector3());
    if (size.length() === 0) return;
    framed.current = true;
    const radius = size.length() / 2;
    const fovRad = (camera.fov * Math.PI) / 180;
    const distance = (radius / Math.sin(fovRad / 2)) * margin;
    const direction = new Vector3(1, 0.65, 1).normalize();
    camera.position.copy(direction.multiplyScalar(distance));
    camera.near = Math.max(distance / 100, 0.01);
    camera.far = distance * 10;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  }, [camera, groupRef]);
  return null;
}

function parseConfig(raw) {
  try {
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

// stlSrc accepts either one path or several joined with "|" (from a Nunjucks
// front-matter array), so an assembled CAD model (multiple parts) renders as one
// scene instead of a separate viewer per part.
// Optional (all set from the project's front matter):
//   stlMode "explode" | "drawers" + stlConfig (JSON) : animated 3MF, see ThreeMFAssembly;
//   stlToggle "label when off|label when on"    : the side button that flips the animation;
//   stlDownload / stlDownloadLabel               : a small download button on the viewer.
export default function StlViewer({ stlSrc, stlLabel, stlMode, stlConfig, stlToggle, stlDownload, stlDownloadLabel, onReady }) {
  if (!supportsWebGL() || !stlSrc) return null;
  const sources = stlSrc.split("|").filter(Boolean);
  const groupRef = useRef(null);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const config = parseConfig(stlConfig);
  const labels = (stlToggle || "").split("|");
  const [on, setOn] = useState(config.start === 1 ? 1 : 0);
  // The model turns by itself until the visitor first grabs it, then it stays
  // still so one spot can be studied without interruption.
  const [spinning, setSpinning] = useState(true);
  const stateRef = useRef(on);
  useEffect(() => {
    stateRef.current = on;
  }, [on]);
  const animated = Boolean(stlMode && labels.length === 2);

  return (
    <ErrorBoundary>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 40 }}
        gl={{ antialias: true, powerPreference: "low-power" }}
        role="img"
        aria-label={stlLabel}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => event.preventDefault(), { once: true });
          onReady?.();
        }}
      >
        <directionalLight position={[3, 4, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <StudioEnvironment />
          <group ref={groupRef}>
            <Center>
              {sources.map((src) => (
                <Model key={src} src={src} mode={animated ? stlMode : null} config={config} stateRef={stateRef} reduced={reducedMotion} />
              ))}
            </Center>
          </group>
          <AutoFrameCamera groupRef={groupRef} margin={stlMode === "drawers" ? 1.7 : stlMode === "explode" ? 0.9 : 1.4} />
        </Suspense>
        <OrbitControls enablePan={false} autoRotate={spinning && !reducedMotion} autoRotateSpeed={1.2} onStart={() => setSpinning(false)} />
      </Canvas>
      {stlLabel ? <span className="stl-viewer-label">{stlLabel}</span> : null}
      {animated || stlDownload ? (
        <div className="stl-viewer-controls">
          {animated ? (
            <button type="button" className="stl-viewer-btn" aria-pressed={on === 1} onClick={() => setOn(on ? 0 : 1)}>
              {on ? labels[1] : labels[0]}
            </button>
          ) : null}
          {stlDownload ? (
            <a className="stl-viewer-btn" href={stlDownload} download>
              {stlDownloadLabel || "Télécharger"}
            </a>
          ) : null}
        </div>
      ) : null}
    </ErrorBoundary>
  );
}
