// Decorative liquid-glass accent next to the homepage H1. Built on drei's
// MeshTransmissionMaterial (proper transmission sampling, chromatic aberration,
// roughness handling) instead of a hand-rolled MeshPhysicalMaterial + custom noise
// shader -- that hand-rolled version is what read as flat/cheap in earlier attempts.
//
// The shape is a tangent-ogive nose cone -- the actual geometric family real
// rocket nose cones use -- instead of a generic sphere, tying the hero object to
// Ruben's aerospace work rather than being decoration for its own sake. The exact
// Icarus CAD nose cone only exists as CATPart/STEP (no in-browser loader for that
// format without extra conversion tooling not available here); this profile is
// built from the same tangent-ogive formula so it reads as a real nose cone shape,
// not an arbitrary primitive. If/when the real part is exported to glTF/STL, swap
// this for StlViewer's loader instead.
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
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { Vector2 } from "three";
import { supportsWebGL, ErrorBoundary } from "../shared/webgl.jsx";
import StudioEnvironment from "../shared/StudioEnvironment.jsx";

function tangentOgiveProfile({ noseLength = 1, bodyLength = 0.7, radius = 0.35, segments = 28 }) {
  const totalHeight = noseLength + bodyLength;
  const center = totalHeight / 2;
  const points = [new Vector2(radius, 0 - center), new Vector2(radius, bodyLength - center)];
  const rho = (radius * radius + noseLength * noseLength) / (2 * radius);
  for (let i = 1; i <= segments; i++) {
    const x = (i / segments) * noseLength;
    const r = Math.sqrt(Math.max(rho * rho - (noseLength - x) * (noseLength - x), 0)) + radius - rho;
    points.push(new Vector2(Math.max(r, 0.0008), bodyLength + x - center));
  }
  points[points.length - 1].x = 0.0008;
  return points;
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

function GlassNoseCone({ scrollProgress }) {
  const group = useRef(null);
  const profile = useMemo(() => tangentOgiveProfile({}), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    const sway = Math.sin(state.clock.elapsedTime * 0.35) * 0.1;
    group.current.rotation.z = -0.49 + sway + scrollProgress.current * 0.6;
    group.current.rotation.x = scrollProgress.current * 0.3;
  });

  return (
    // The profile is already centered on its own axis, so rotation pivots
    // correctly around the object's center. Base tilt (-0.49 rad, ~28deg) keeps
    // the taper reading as a real 3D form even before any sway/scroll offset.
    <group ref={group}>
      <mesh>
        <latheGeometry args={[profile, 32]} />
        <MeshTransmissionMaterial
          thickness={0.8}
          roughness={0.04}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.08}
          color="#eaf7ff"
          attenuationColor="#3fb8ff"
          attenuationDistance={1.6}
        />
      </mesh>
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
          <GlassNoseCone scrollProgress={scrollProgress} />
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
