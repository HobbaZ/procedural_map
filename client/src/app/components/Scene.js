"use client";

import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
  Loader,
} from "@react-three/drei";
import Ground from "./Ground";
import RandomCubes from "./RandomCubes";
import { Suspense } from "react";

export default function Scene() {
  const backgroundColor = "blue";

  return (
    <>
      <Canvas
        shadows
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
        style={{ height: "100vh", width: "100%" }}
      >
        <Suspense>
          {/*<fog attach="fog" near={10} far={60} />*/}
          {/* Lights */}
          <ambientLight intensity={0.1} />

          <PerspectiveCamera makeDefault position={[-6, 3.9, 6.2]} fov={40} />
          <Environment preset="dawn" />

          <RandomCubes rows={30} columns={30} spacing={1} colHeight={5} />

          <OrbitControls
            target={[0, 0, 0]}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
