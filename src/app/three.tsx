"use client"

import { Canvas, useFrame } from "@react-three/fiber";
import { BakeShadows, MeshReflectorMaterial } from "@react-three/drei";
import { easing } from "maath";
import { ScreenHtml } from "./screen";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Three() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 0], fov: 45}}
    >
      {/* Lights */}
      <hemisphereLight intensity={0.55} groundColor="black" />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 10, -20]} intensity={0.75} />
      <pointLight position={[-10, -10, -10]} />
      <DisplayObject />
      {/* Small helper that freezes the shadows for better performance */}
      <BakeShadows />
    </Canvas>
  );
}

function DisplayObject() {
  const [clicked, setClicked] = useState(false);
  const imacRef = useRef<THREE.Group>(null!);
  const vec = new THREE.Vector3();

  useFrame((state) => {
    if (clicked) {
      state.camera.position.lerp(vec.set(0, 4, -8), 0.05);
      state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, -Math.PI/15, 0.05);
      state.camera.updateProjectionMatrix();
    } else {
      state.camera.position.lerp(vec.set(0, -4, 0), 0.01);
      state.camera.rotation.x = THREE.MathUtils.lerp(
        state.camera.rotation.x,
        Math.PI / 15,
        0.01
      );
      state.camera.updateProjectionMatrix();

    }
  });

  return (
    <group
      position={[0, -5, -20]}
      rotation={[0, 0, 0]}
      ref={imacRef}
      onClick={() => setClicked(!clicked)}
    >
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
  );
}