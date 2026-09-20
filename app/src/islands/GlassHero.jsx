// Decorative liquid-glass accent next to the homepage H1. Built on drei's
// MeshTransmissionMaterial (proper transmission sampling, chromatic aberration,
// roughness handling) instead of a hand-rolled MeshPhysicalMaterial + custom noise
// shader -- that hand-rolled version is what read as flat/cheap in earlier attempts.
//
// The shape is Ruben's own mark (see assets/favicon/icon.svg for the flat
// version): a seal -- his favorite animal -- balancing a ringed planet on its
// nose, tying the hero object to his actual identity rather than being
// decoration for its own sake ("j'aimerais que le truc en 3d... soit mon
// logo"). A seal's side profile has no rotational symmetry, so this replaces
// the previous tangent-ogive nose cone's latheGeometry (revolve-only, can't
// represent an asymmetric silhouette) with an ExtrudeGeometry traced from the
// same profile as the flat logo, kept as one continuous glass solid rather
// than many overlapping parts -- individual whiskers/gradient details from
// the flat mark don't translate to depth anyway, so only the two elements
// that read as real 3D forms (the seal body+head, the ringed planet) made
// the cut.
//
// Rotation responds to homepage scroll progress (read via a ref updated on
// scroll, not React state, so scrolling never triggers a re-render) in addition
// to its own idle sway -- previously a pure idle loop with no reaction to
// anything on the page, which read as decoration rather than something alive.
//
// Environment lighting is shared with StlViewer via ../shared/StudioEnvironment
// (see that file for why) instead of each component carrying its own recipe.
//
// Pure progressive enhancement: renders nothing if WebGL is unsupported, and any
// runtime error is caught by the ErrorBoundary so the (empty) container is the
// worst case, never a broken page.
import { Suspense, useMemo, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { Shape } from "three";
import { supportsWebGL, ErrorBoundary } from "../shared/webgl.jsx";
import StudioEnvironment from "../shared/StudioEnvironment.jsx";

// Traced from the same seal silhouette as assets/favicon/icon.svg (a 100x100
// box: body ellipse cx46 cy62 rx30 ry24, head circle cx76 cy41 r17, snout
// circle cx89 cy32 r8), converted to one closed outline instead of three
// overlapping primitives -- ExtrudeGeometry needs a single continuous path.
// svgToLocal maps that 100x100 space to centered, Y-up Three.js units.
function svgToLocal([x, y]) {
  return [x / 42 - 1.2, 1 - y / 42];
}

function sealProfile() {
  const p = (x, y) => svgToLocal([x, y]);
  const shape = new Shape();
  const start = p(14, 84);
  shape.moveTo(start[0], start[1]);
  shape.bezierCurveTo(...p(4, 70), ...p(10, 46), ...p(34, 40));
  shape.bezierCurveTo(...p(50, 36), ...p(56, 30), ...p(66, 26));
  shape.bezierCurveTo(...p(76, 22), ...p(90, 22), ...p(97, 30));
  shape.bezierCurveTo(...p(101, 35), ...p(94, 42), ...p(85, 44));
  shape.bezierCurveTo(...p(80, 45.5), ...p(76, 48), ...p(70, 50));
  shape.bezierCurveTo(...p(60, 54), ...p(54, 62), ...p(52, 74));
  shape.bezierCurveTo(...p(50, 84), ...p(40, 92), ...p(26, 91));
  shape.bezierCurveTo(...p(18, 90.5), ...p(12, 88), ...p(14, 84));
  return shape;
}

function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

const EXTRUDE_DEPTH = 0.5;
const EXTRUDE_SETTINGS = {
  depth: EXTRUDE_DEPTH,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.04,
  bevelSegments: 6,
  curveSegments: 24,
};
// The planet sits just past the extrude's front face (depth/2 + bevel) so it
// reads as balanced ON the snout instead of clipping into the glass.
const PLANET_LOCAL = svgToLocal([95, 14]);
const PLANET_Z = EXTRUDE_DEPTH / 2 + 0.22;

function GlassSeal({ scrollProgress }) {
  const group = useRef(null);
  const profile = useMemo(() => sealProfile(), []);

  useFrame((state) => {
    if (!group.current) return;
    // Unlike the old lathe-revolved nose cone (identical from every angle), this
    // is a flat extruded medallion -- a full 360deg turntable spin would swing it
    // edge-on (a near-invisible sliver) for half of every rotation. A bounded
    // side-to-side turn keeps the recognizable face toward the camera while still
    // reading as alive and three-dimensional.
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.25) * 0.55;
    group.current.rotation.z = Math.sin(t * 0.35) * 0.06 - scrollProgress.current * 0.2;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.05 + scrollProgress.current * 0.25;
  });

  return (
    <group ref={group} scale={0.56}>
      <mesh position={[0, 0, -EXTRUDE_DEPTH / 2]}>
        <extrudeGeometry args={[profile, EXTRUDE_SETTINGS]} />
        <MeshTransmissionMaterial
          thickness={0.8}
          roughness={0.04}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.06}
          color="#eaf7ff"
          attenuationColor="#3fb8ff"
          attenuationDistance={1.6}
        />
      </mesh>
      {/* The ringed planet balanced on the seal's nose -- the one warm accent
          against the cool blue glass body, same "seal balances a ball" pun as
          the flat logo. */}
      <group position={[PLANET_LOCAL[0], PLANET_LOCAL[1], PLANET_Z]} rotation={[1.15, 0.3, 0]}>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <MeshTransmissionMaterial
            thickness={0.4}
            roughness={0.08}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.04}
            color="#fff3d6"
            attenuationColor="#e8b25c"
            attenuationDistance={0.6}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.27, 0.025, 12, 48]} />
          <meshStandardMaterial color="#e8c97a" roughness={0.35} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function GlassHero({ onReady }) {
  const scrollProgress = useScrollProgress();
  if (!supportsWebGL()) return null;

  return (
    <ErrorBoundary>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.6], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => event.preventDefault(), { once: true });
          onReady?.();
        }}
      >
        <Suspense fallback={null}>
          <GlassSeal scrollProgress={scrollProgress} />
          {/* background+blur renders the Lightformer shapes as a soft ambient
              gradient behind the object (the self-hosted "shader-gradient" look) --
              this also gives the transmission material something bright and
              colorful to refract, instead of the page's near-black backdrop
              bleeding through the canvas alpha and reading as a dark, dull gem. */}
          <StudioEnvironment background />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
