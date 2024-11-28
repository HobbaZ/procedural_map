"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function RandomCubes({ rows, columns, spacing, colHeight }) {
  // Calculate grid offset to center it
  const offsetX = ((columns - 1) * spacing) / 2; // Half of total width
  const offsetZ = ((rows - 1) * spacing) / 2; // Half of total depth

  const mesh = useRef();

  // Generate cube data in a grid
  const cubes = useMemo(() => {
    const cubeArray = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        cubeArray.push({
          height: Math.random() * 2 + 0.1, // Random height
          position: [
            col * spacing - offsetX, // Offset X position to center
            0, // Ground level for Y-axis
            row * spacing - offsetZ, // Offset Z position to center
          ],
        });
      }
    }
    return cubeArray;
  }, [rows, columns, spacing, offsetX, offsetZ]);

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <>
      <group ref={mesh}>
        {cubes.map((cube, index) => (
          <mesh
            key={index}
            position={[
              cube.position[0],
              cube.height / 2, // Offset by half the height to rest on ground
              cube.position[2],
            ]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1, cube.height, 1]} />{" "}
            {/* Width, Height, Depth */}
            <meshStandardMaterial />
          </mesh>
        ))}
      </group>
    </>
  );
}
