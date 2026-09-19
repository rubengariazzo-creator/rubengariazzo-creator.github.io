// Decorative liquid-metal blob next to the homepage H1, built with Three.js/WebGL.
// Pure progressive enhancement: the canvas is empty until a frame actually renders,
// and any failure at any point (no WebGL, context loss, a runtime error) just leaves
// it empty — the real H1 text and the existing CSS gradient background are never
// affected. Skipped entirely under prefers-reduced-motion or on narrow viewports
// (see the matching CSS), since the effect is a bonus, not load-bearing content.
const THREE_CDN = "https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js";

const NOISE_GLSL = `
// Ashima Arts / Stefan Gustavson simplex noise (public domain-style, widely reused)
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch (err) {
    return false;
  }
}

async function init() {
  const canvas = document.querySelector("[data-hero-liquid]");
  if (!canvas || prefersReducedMotion() || !supportsWebGL()) return;
  if (window.matchMedia("(max-width: 48rem)").matches) return;

  let THREE;
  try {
    THREE = await import(THREE_CDN);
  } catch (err) {
    return;
  }

  let renderer, scene, camera, mesh, rafId, resizeTimer;
  let running = true;

  function teardown() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", teardown);
    try {
      mesh?.geometry.dispose();
      mesh?.material.dispose();
      renderer?.dispose();
    } catch (err) {
      // best-effort cleanup only
    }
  }

  function sizeToCanvas() {
    const rect = canvas.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height, 1);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      try {
        sizeToCanvas();
      } catch (err) {
        teardown();
      }
    }, 120);
  }

  function onVisibility() {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
    } else if (running) {
      rafId = requestAnimationFrame(tick);
    }
  }

  const clock = { start: performance.now() };
  let firstFrame = true;

  function tick() {
    if (!running) return;
    try {
      const t = (performance.now() - clock.start) / 1000;
      mesh.material.userData.shader.uniforms.uTime.value = t;
      mesh.rotation.y = t * 0.18;
      mesh.rotation.x = Math.sin(t * 0.12) * 0.15;
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        canvas.classList.add("is-ready");
      }
      rafId = requestAnimationFrame(tick);
    } catch (err) {
      teardown();
    }
  }

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(38, 1, 0.1, 10);
    camera.position.z = 3.4;

    const geometry = new THREE.IcosahedronGeometry(1, 24);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#5fd0ff"),
      metalness: 0.82,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      emissive: new THREE.Color("#0d3a4d"),
      emissiveIntensity: 0.35,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>\nuniform float uTime;\n${NOISE_GLSL}`
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          float n = snoise(normal * 1.6 + uTime * 0.35);
          transformed += normal * (n * 0.16);`
        );
      material.userData.shader = shader;
    };
    // Placeholder until onBeforeCompile runs on first compile.
    material.userData.shader = { uniforms: { uTime: { value: 0 } } };

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight("#1a2a33", 1.1));
    const key = new THREE.DirectionalLight("#ffffff", 1.4);
    key.position.set(2, 2, 3);
    scene.add(key);
    const rim = new THREE.PointLight("#9be8ff", 2, 8);
    rim.position.set(-2, -1, 2);
    scene.add(rim);

    sizeToCanvas();

    canvas.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
        teardown();
      },
      { once: true }
    );

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", teardown, { once: true });

    rafId = requestAnimationFrame(tick);
  } catch (err) {
    teardown();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
