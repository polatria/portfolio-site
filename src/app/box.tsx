import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export function Box({
  position,
  scale,
  x = 0,
  y = 1.2,
}: {
  position: [x: number, y: number, z: number];
  scale: number;
  x?: number;
  y?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [isHovered, setHover] = useState(false);
  const [isActive, setActive] = useState(false);

  function setRotation() {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.z += 0;
  }

  const textRef = useRef<any>();
  const rand = Math.random() * 10000;
  useFrame((state) => {
    setRotation();
    textRef.current.position.x =
      x + Math.sin(rand + state.clock.elapsedTime / 4) * 8;
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={isActive ? scale * 1.5 : scale}
      onClick={() => setActive(!isActive)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial>
        <RenderTexture attach="map" anisotropy={16} sourceFile={undefined}>
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 10]}
          />
          <color
            attach="background"
            args={[isHovered ? "hotpink" : "orange"]}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Text
            font="/RobotoMono-Medium.ttf"
            ref={textRef}
            fontSize={4}
            letterSpacing={-0.1}
            color="#555"
          >
            Poimandres.
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
}
