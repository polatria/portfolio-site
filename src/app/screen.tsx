/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 ./public/imac_white.glb --types --transform --instance
Files: ./public/imac_white.glb [1MB] > imac_white-transformed.glb [88.12KB] (91%)
*/

// model downloaded from: https://archive3d.net/?a=download&id=bf2dc0df

import * as THREE from "three";
import React, { useRef, useState } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  RenderTexture,
  Html,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { Box } from "./box";
import Image from "next/image";
import david from "../../public/14156294_307116026318334_1954719553_n.jpg"
import beach from "../../public/363506894_3116377108666299_8133655392667603111_n.jpg"
import shrine from "../../public/14359344_1682170555434970_878700362586914816_n.jpg"
import girl from "../../public/IMG_4958.jpg"

type GLTFResult = GLTF & {
  nodes: {
    Box01_1: THREE.Mesh;
    Box01_2: THREE.Mesh;
  };
  materials: {
    PaletteMaterial002: THREE.MeshStandardMaterial;
    PaletteMaterial001: THREE.MeshStandardMaterial;
  };
};

useGLTF.preload("/imac.glb");

/* This component renders a monitor (taken out of the gltf model)
   It renders a custom scene into a texture and projects it onto monitors screen */
function ImacModel({ children, ...props }: { children: React.ReactNode }) {
  const { nodes, materials } = useGLTF("/imac.glb") as GLTFResult;
  return (
    <group {...props}>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box01_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh geometry={nodes.Box01_1.geometry}>{children}</mesh>
      </group>
    </group>
  );
}

/* Renders a monitor with some text */
export function ScreenBlinkColor(props: JSX.IntrinsicElements["group"]) {
  const blinkRef = useRef<THREE.Color>(new THREE.Color("#35c19f"));
  useFrame(
    () =>
      (blinkRef.current = new THREE.Color(
        Math.random() > 0.2 ? "#35c19f" : "black"
      ))
  );

  return (
    <ImacModel {...props}>
      <meshBasicMaterial toneMapped={false}>
        <RenderTexture
          width={512}
          height={512}
          attach="map"
          anisotropy={16}
          sourceFile={undefined}
        >
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 10]}
          />
          <color ref={blinkRef} attach="background" args={[blinkRef.current]} />
        </RenderTexture>
      </meshBasicMaterial>
    </ImacModel>
  );
}

/* Renders a monitor with some text */
export function ScreenHtml(props: JSX.IntrinsicElements["group"]) {
  return (
    <ImacModel {...props}>
      {/* Drei's HTML component can "hide behind" canvas geometry */}
      <Html
        className="screen"
        rotation={[Math.PI / 2.25, 0, 0]}
        position={[0, -2.2, 13]}
        transform
        occlude
      >
        <div
          className="screen-content"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div>
            <h1>Images</h1>
            <div className="slide-wrap">
              <div className="slide-box">
                <Image src={david} alt={""} />
                <p>David</p>
              </div>
              <div className="slide-box">
                <Image src={beach} alt={""} />
                <p>Beach</p>
              </div>
              <div className="slide-box">
                <Image src={shrine} alt={""} />
                <p>Shrine</p>
              </div>
              <div className="slide-box">
                <Image src={girl} alt={""} />
                <p>Girl</p>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </ImacModel>
  );
}

/* Renders a monitor with a spinning box */
export function ScreenInteractive(props: JSX.IntrinsicElements["group"]) {
  return (
    <ImacModel {...props}>
      <PerspectiveCamera
        makeDefault
        manual
        aspect={1 / 1}
        position={[0, 0, 10]}
      />
      <color attach="background" args={["#35c19f"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.75} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, 0, 0]} scale={1} />
    </ImacModel>
  );
}
