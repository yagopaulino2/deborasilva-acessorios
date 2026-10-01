"use client";
// Joias 3D procedurais (sem arquivos pesados). Se o produto tiver um modelo .glb, o visualizador o usa.
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const METAIS = {
  gold: { color: "#e0b860", roughness: 0.16 },
  rose: { color: "#e3a58f", roughness: 0.18 },
  silver: { color: "#e3e5ea", roughness: 0.12 },
};
const PEDRAS = {
  clear: "#cfe3ff",
  ruby: "#d11f4a",
  pearl: "#f7efef",
  rose: "#f3a6c0",
};

function Metal({ metal = "gold" }) {
  const m = METAIS[metal] || METAIS.gold;
  return <meshStandardMaterial color={m.color} metalness={1} roughness={m.roughness} envMapIntensity={1.6} />;
}

function Stone({ pedra = "clear", position = [0, 0, 0], scale = 1 }) {
  const color = PEDRAS[pedra] || PEDRAS.clear;
  if (pedra === "pearl") {
    return (
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshPhysicalMaterial color={color} roughness={0.18} metalness={0.1} clearcoat={1} clearcoatRoughness={0.1} sheen={1} sheenColor="#ffd9e3" envMapIntensity={1.4} />
      </mesh>
    );
  }
  return (
    <group position={position} scale={scale}>
      {/* Coroa */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.26, 0.42, 0.22, 8]} />
        <meshPhysicalMaterial color={color} metalness={0.1} roughness={0.02} clearcoat={1} flatShading envMapIntensity={1.5} ior={2.4} />
      </mesh>
      {/* Pavilhão */}
      <mesh position={[0, -0.22, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.42, 0.46, 8]} />
        <meshPhysicalMaterial color={color} metalness={0.1} roughness={0.02} clearcoat={1} flatShading envMapIntensity={1.5} ior={2.4} />
      </mesh>
    </group>
  );
}

function Anel({ metal, pedra }) {
  return (
    <group rotation={[0, 0, 0]}>
      <mesh>
        <torusGeometry args={[1, 0.13, 40, 120]} />
        <Metal metal={metal} />
      </mesh>
      {/* Castelo */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.16, 0.1, 0.22, 16]} />
        <Metal metal={metal} />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const a = (i * Math.PI) / 2 + Math.PI / 4;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.3, 1.36, Math.sin(a) * 0.3]} rotation={[Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35]}>
            <cylinderGeometry args={[0.028, 0.04, 0.3, 8]} />
            <Metal metal={metal} />
          </mesh>
        );
      })}
      <Stone pedra={pedra} position={[0, 1.38, 0]} scale={0.95} />
    </group>
  );
}

function Colar({ metal, pedra }) {
  const arc = Math.PI * 1.25;
  return (
    <group position={[0, 0.55, 0]}>
      <mesh rotation={[0, 0, -Math.PI / 2 - arc / 2]}>
        <torusGeometry args={[1.7, 0.035, 12, 160, arc]} />
        <Metal metal={metal} />
      </mesh>
      <mesh position={[0, -1.72, 0]}><sphereGeometry args={[0.07, 16, 16]} /><Metal metal={metal} /></mesh>
      <Stone pedra={pedra} position={[0, -2.2, 0]} scale={1.05} />
    </group>
  );
}

function Brincos({ metal, pedra }) {
  return (
    <group>
      {[-0.95, 0.95].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 1.15, 0]}><torusGeometry args={[0.13, 0.03, 16, 40]} /><Metal metal={metal} /></mesh>
          <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.2, 32, 32]} /><Metal metal={metal} /></mesh>
          <Stone pedra={pedra} position={[0, 0.05, 0]} scale={1.15} />
        </group>
      ))}
    </group>
  );
}

function Pulseira({ metal, pedra }) {
  const n = 20;
  return (
    <group rotation={[Math.PI / 2.6, 0, 0]}>
      <mesh><torusGeometry args={[1.45, 0.11, 32, 140]} /><Metal metal={metal} /></mesh>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.45, Math.sin(a) * 1.45, 0.1]}>
            <sphereGeometry args={[0.095, 20, 20]} />
            <meshPhysicalMaterial color={PEDRAS[pedra] || PEDRAS.clear} roughness={0.02} clearcoat={1} envMapIntensity={2.8} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Jewel({ tipo = "anel", metal = "gold", pedra = "clear" }) {
  const Comp = { anel: Anel, colar: Colar, brinco: Brincos, brincos: Brincos, pulseira: Pulseira }[tipo] || Anel;
  return <Comp metal={metal} pedra={pedra} />;
}

/** Faz a joia girar devagar (pausa quando o usuário arrasta). */
export function Spin({ children, speed = 0.35, tilt = 0.12, enabled = true }) {
  const ref = useRef();
  useFrame((state, dt) => {
    if (!ref.current || !enabled) return;
    ref.current.rotation.y += dt * speed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * tilt;
  });
  return <group ref={ref}>{children}</group>;
}

/** Iluminação de estúdio sem baixar arquivos externos. */
export function Studio({ Environment, Lightformer }) {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={5} position={[0, 5, -6]} scale={[14, 8, 1]} color="#fff3dc" />
      <Lightformer form="rect" intensity={3.5} position={[-6, 1, 2]} rotation={[0, Math.PI / 2.5, 0]} scale={[8, 6, 1]} color="#ffe2ea" />
      <Lightformer form="rect" intensity={3.5} position={[6, 1, 2]} rotation={[0, -Math.PI / 2.5, 0]} scale={[8, 6, 1]} color="#fff6e0" />
      <Lightformer form="ring" intensity={2.5} position={[0, -3, 4]} scale={6} color="#ffffff" />
    </Environment>
  );
}
