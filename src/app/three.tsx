"use client"

import { Canvas } from "@react-three/fiber";
import { BakeShadows, MeshReflectorMaterial } from "@react-three/drei";
import { ScreenHtml } from "./screen";

export default function Three() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3], fov: 45, near: 1, far: 30 }}
    >
      {/* Lights */}
      <hemisphereLight intensity={0.55} groundColor="black" />
      <group position={[0, -5, -20]} rotation={[0, Math.PI / 7, 0]}>
        <ScreenHtml scale={0.5} position={[0, 0, 0]} />
        {/* Plane reflections + distance blur */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 30]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
            mirror={0}
          />
        </mesh>
      </group>
      {/* Small helper that freezes the shadows for better performance */}
      <BakeShadows />
    </Canvas>
  );
}
