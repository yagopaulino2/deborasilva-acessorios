"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, ContactShadows, useGLTF, Center } from "@react-three/drei";
import { Jewel, Spin, Studio } from "./Jewel3D";
import useInView from "./useInView";

function Glb({ url }) {
  const { scene } = useGLTF(url);
  return <Center><primitive object={scene} /></Center>;
}

export default function Viewer3D({ produto }) {
  const [ref, visible] = useInView("0px");
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const glb = produto.modelo3d;
  const escala = { anel: 0.76, colar: 0.56, brinco: 1.0, pulseira: 0.8 }[produto.modelo3d_tipo] || 1.1;
  return (
    <div ref={ref} className="relative h-full w-full cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.6, 6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#fff0d0" />
        <Suspense fallback={null}>
          {glb ? (
            <Glb url={glb} />
          ) : (
            <Spin speed={0.3} tilt={0}>
              <group scale={escala} position={[0, produto.modelo3d_tipo === "anel" ? -0.3 : 0, 0]} rotation={produto.modelo3d_tipo === "anel" ? [0.3, 0, 0] : [0, 0, 0]}>
                <Jewel tipo={produto.modelo3d_tipo} metal={produto.metal} pedra={produto.pedra} />
              </group>
            </Spin>
          )}
          <Studio Environment={Environment} Lightformer={Lightformer} />
        </Suspense>
        <ContactShadows position={[0, -2.4, 0]} opacity={0.35} scale={9} blur={2.6} far={4} />
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 1.8} rotateSpeed={0.9} />
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[11px] tracking-[0.2em] text-champagne-300/70">
        ARRASTE PARA GIRAR
      </p>
    </div>
  );
}
