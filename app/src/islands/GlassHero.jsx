// Decorative accent next to the homepage H1: Ruben's own mark (see
// assets/favicon/icon.svg) as a rotating medallion, tying the hero object to
// his actual identity instead of being decoration for its own sake
// ("j'aimerais que le truc en 3d... soit mon logo").
//
// First attempt sculpted the seal as pure geometry (an ExtrudeGeometry
// silhouette) wrapped in MeshTransmissionMaterial, matching the previous
// nose cone's "liquid glass" material. Verdict: "on ne reconnait pas du tout
// le logo" -- glass transmission distorts silhouette edges and washes out
// exactly the details (belly patch, whiskers, the ring, the eye) that make
// the flat mark readable, and a monochrome glass blob has none of the flat
// version's color-coded regions to fall back on. Fixed by inverting the
// approach: render the actual approved 2D artwork as a texture on a simple
// rounded-square medallion, so what's on screen is guaranteed to match what
// Ruben already approved, and use the material for shine (a clearcoat) on
// top of that artwork instead of trying to sculpt the artwork out of glass.
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
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CanvasTexture, Shape, SRGBColorSpace, Vector2 } from "three";
import { supportsWebGL, ErrorBoundary } from "../shared/webgl.jsx";
import StudioEnvironment from "../shared/StudioEnvironment.jsx";

const MEDALLION_SIZE = 2.3;
const CORNER_RADIUS = 0.42;

function roundedSquareProfile(size, radius) {
  const h = size / 2;
  const shape = new Shape();
  shape.moveTo(-h + radius, -h);
  shape.lineTo(h - radius, -h);
  shape.quadraticCurveTo(h, -h, h, -h + radius);
  shape.lineTo(h, h - radius);
  shape.quadraticCurveTo(h, h, h - radius, h);
  shape.lineTo(-h + radius, h);
  shape.quadraticCurveTo(-h, h, -h, h - radius);
  shape.lineTo(-h, -h + radius);
  shape.quadraticCurveTo(-h, -h, -h + radius, -h);
  return shape;
}

// Rasterizes the actual favicon SVG onto a canvas so the medallion shows
// exactly the approved artwork (seal, belly patch, whiskers, ring, planet)
// at real pixel resolution, instead of an <img>-sourced texture whose
// rasterization size the browser picks for us.
function useSealTexture() {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      canvas.getContext("2d").drawImage(img, 0, 0, 512, 512);
      const tex = new CanvasTexture(canvas);
      tex.colorSpace = SRGBColorSpace;
      setTexture(tex);
    };
    img.src = "/assets/favicon/icon.svg";
    return () => {
      cancelled = true;
    };
  }, []);
  return texture;
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

// three's default ExtrudeGeometry UV generator uses raw local vertex
// coordinates as UVs (not normalized to 0-1), so anything outside [0,1] just
// clamps to the texture's edge pixels -- for a shape centered on the origin
// like this one, that means almost the whole face samples one edge pixel
// instead of the artwork. This generator normalizes against the medallion's
// own known size instead.
const toUV = (vertices, index) =>
  new Vector2(vertices[index * 3] / MEDALLION_SIZE + 0.5, vertices[index * 3 + 1] / MEDALLION_SIZE + 0.5);
const medallionUVGenerator = {
  generateTopUV: (geometry, vertices, a, b, c) => [toUV(vertices, a), toUV(vertices, b), toUV(vertices, c)],
  generateSideWallUV: (geometry, vertices, a, b, c, d) => [
    toUV(vertices, a),
    toUV(vertices, b),
    toUV(vertices, c),
    toUV(vertices, d),
  ],
};

const EXTRUDE_DEPTH = 0.4;
const EXTRUDE_SETTINGS = {
  depth: EXTRUDE_DEPTH,
  bevelEnabled: true,
  bevelThickness: 0.09,
  bevelSize: 0.08,
  bevelSegments: 10,
  curveSegments: 16,
  UVGenerator: medallionUVGenerator,
};
// A pure side-to-side oscillation passes back through 0deg -- dead flat,
// depth invisible -- twice a cycle. A small constant tilt keeps the bevelled
// edge (the actual "depth" that was asked for) visibly catching the light at
// every point in the sway instead of disappearing at the midpoint.
const BASE_TILT_Y = 0.18;
const BASE_TILT_X = -0.08;

function GlassSeal({ scrollProgress }) {
  const group = useRef(null);
  const profile = useMemo(() => roundedSquareProfile(MEDALLION_SIZE, CORNER_RADIUS), []);
  const texture = useSealTexture();

  useFrame((state) => {
    if (!group.current) return;
    // A flat medallion (unlike the old lathe-revolved nose cone, identical from
    // every angle) would swing edge-on -- a near-invisible sliver -- for half of
    // a full 360deg spin. A bounded side-to-side turn keeps the artwork facing
    // the camera while still reading as alive and three-dimensional.
    const t = state.clock.elapsedTime;
    group.current.rotation.y = BASE_TILT_Y + Math.sin(t * 0.25) * 0.45;
    group.current.rotation.z = Math.sin(t * 0.35) * 0.05 - scrollProgress.current * 0.2;
    group.current.rotation.x = BASE_TILT_X + Math.sin(t * 0.2) * 0.05 + scrollProgress.current * 0.25;
  });

  if (!texture) return null;

  return (
    <group ref={group} scale={0.62}>
      <mesh position={[0, 0, -EXTRUDE_DEPTH / 2]}>
        <extrudeGeometry args={[profile, EXTRUDE_SETTINGS]} />
        {/* group 0 = front+back caps, group 1 = extrusion/bevel side walls
            (verified directly -- three's own docs are ambiguous on the
            order). The artwork only needs to live on the caps; the thin rim
            reuses the artwork's own near-black background so it reads as a
            clean edge, not a stretched smear. */}
        <meshPhysicalMaterial
          attach="material-0"
          map={texture}
          roughness={0.55}
          clearcoat={0.25}
          clearcoatRoughness={0.55}
        />
        <meshStandardMaterial attach="material-1" color="#05060a" roughness={0.5} />
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
          <GlassSeal scrollProgress={scrollProgress} />
          {/* No `background` here (unlike the old glass nose cone): that
              painted the Lightformers as a bright blurred backdrop, which is
              what actually read as "the white halo" -- not a CSS glow, the
              canvas's own content. The medallion carries its own artwork and
              colors, so it doesn't need a lit backdrop to read; the page's
              own dark background now shows through the transparent canvas
              instead. Lightformers stay in the tree purely for reflections/
              lighting on the clearcoat. */}
          <StudioEnvironment />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
