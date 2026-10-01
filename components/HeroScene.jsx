"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { Jewel, Spin, Studio } from "./Jewel3D";
import useInView from "./useInView";

export default function HeroScene() {
  const [ref, visible] = useInView("0px");
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={mobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0.4, 5.4], fov: 34 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} color="#fff0d0" />
        <pointLight position={[-4, 1, 3]} intensity={30} color="#ff9bb8" />
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
          <Spin enabled={!reduce} speed={0.45}>
            <group rotation={[0.35, 0, 0.12]} scale={mobile ? 0.62 : 0.74} position={[0, -0.75, 0]}>
              <Jewel tipo="anel" metal="gold" pedra="clear" />
            </group>
          </Spin>
        </Float>
        <Studio Environment={Environment} Lightformer={Lightformer} />
      </Canvas>
    </div>
  );
}
