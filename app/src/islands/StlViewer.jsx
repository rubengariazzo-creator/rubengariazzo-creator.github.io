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
import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { ThreeMFLoader } from "three/addons/loaders/3MFLoader.js";
import { Box3, MeshStandardMaterial, Vector3 } from "three";
import { supportsWebGL, ErrorBoundary } from "../shared/webgl.jsx";
import StudioEnvironment from "../shared/StudioEnvironment.jsx";

// Same material recipe (color, metalness, roughness) as GlassHero's glass --
// deliberately reused so the CAD viewer reads as part of the same visual family
// under the shared StudioEnvironment lighting, not a generic 3D-model-viewer
// widget with its own unrelated look (its previous flat ambient+directional
// light had no relationship to the hero's lighting at all).
const MATERIAL_PROPS = { color: "#c7ccd4", metalness: 0.3, roughness: 0.4, envMapIntensity: 1.1 };

function StlPart({ src }) {
  const geometry = useLoader(STLLoader, src);
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial {...MATERIAL_PROPS} />
    </mesh>
  );
}

function ThreeMFAssembly({ src }) {
  const group = useLoader(ThreeMFLoader, src);
  group.traverse((child) => {
    if (child.isMesh) {
      const wasArray = Array.isArray(child.material);
      const freshMaterial = () => new MeshStandardMaterial(MATERIAL_PROPS);
      child.material = wasArray ? child.material.map(freshMaterial) : freshMaterial();
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return <primitive object={group} />;
}

function Model({ src }) {
  return src.toLowerCase().endsWith(".3mf") ? <ThreeMFAssembly src={src} /> : <StlPart src={src} />;
}

// Positions the camera from the model's *actual* loaded size instead of a
// hardcoded distance (models loaded here range from a small printed part to a
// 170mm assembly) -- an elevated 3/4 "product shot" angle so both the top and a
// side wall are visible, rather than a flat, close-up crop on one smooth face.
function AutoFrameCamera({ groupRef }) {
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
    const distance = (radius / Math.sin(fovRad / 2)) * 1.4;
    const direction = new Vector3(1, 0.65, 1).normalize();
    camera.position.copy(direction.multiplyScalar(distance));
    camera.near = Math.max(distance / 100, 0.01);
    camera.far = distance * 10;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  }, [camera, groupRef]);
  return null;
}

// stlSrc accepts either one path or several joined with "|" (from a Nunjucks
// front-matter array), so an assembled CAD model (multiple parts) renders as one
// scene instead of a separate viewer per part.
export default function StlViewer({ stlSrc, stlLabel, onReady }) {
  if (!supportsWebGL() || !stlSrc) return null;
  const sources = stlSrc.split("|").filter(Boolean);
  const groupRef = useRef(null);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ErrorBoundary>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 40 }}
        gl={{ antialias: true, powerPreference: "low-power" }}
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
                <Model key={src} src={src} />
              ))}
            </Center>
          </group>
          <AutoFrameCamera groupRef={groupRef} />
        </Suspense>
        <OrbitControls enablePan={false} autoRotate={!reducedMotion} autoRotateSpeed={1.2} />
      </Canvas>
      {stlLabel ? <span className="stl-viewer-label">{stlLabel}</span> : null}
    </ErrorBoundary>
  );
}
