import { Environment, Lightformer } from "@react-three/drei";

// Procedural studio lighting shared by GlassHero and StlViewer -- same
// Lightformer recipe (cyan/white, matching --accent/--accent-strong) so both
// 3D components read as one material family instead of two unrelated widgets.
// GlassHero renders it with `background` (the ambient glow behind the hero
// object); StlViewer renders it without (lighting/reflections only -- the CAD
// model needs a clear, uncluttered background, not a colored glow behind it).
export default function StudioEnvironment({ background = false }) {
  return (
    <Environment resolution={256} background={background} blur={background ? 1 : undefined}>
      <Lightformer intensity={6} color="#5fd0ff" position={[2, 2, 3]} scale={[4, 4, 1]} />
      <Lightformer intensity={4} color="#ffffff" position={[-3, -1, 2]} scale={[3, 3, 1]} />
      <Lightformer intensity={5} color="#9be8ff" position={[0, -3, -2]} scale={[5, 3, 1]} />
      <Lightformer intensity={2} color="#0a0c0f" position={[0, 3, -3]} scale={[6, 3, 1]} />
    </Environment>
  );
}
