"use client"

import { Canvas, useLoader } from "@react-three/fiber"
import { BackSide, TextureLoader } from "three"
import { Html, OrbitControls, Text } from "@react-three/drei"
import { useRouter } from "next/navigation"
import InfoPanel from "./info-panel"
import { Suspense } from "react"
import Spinner from "./spinner"
import { rooms } from "./rooms"

function RoomScene({ room }: { room: string }) {
  const router = useRouter()

  const texture = useLoader(
    TextureLoader,
    rooms[room]?.src || "/textures/living-room.jpg"
  )

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer" // Change cursor to pointer
  }

  const handlePointerOut = () => {
    document.body.style.cursor = "default" // Reset cursor to default
  }

  const handleClick = (target: string) => {
    document.body.style.cursor = "default" // Reset cursor to default on click
    router.push(`/virtual-tour/view?room=${target}`)
  }

  return (
    <>
      {/* 360 Sphere */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>

      {/* Floating Buttons (Hotspots) */}
      {rooms[room]?.hotspots.map((hotspot, index) => (
        <group key={index} position={hotspot.position}>
          {/* Hotspot Button */}
          <mesh
            onClick={() => handleClick(hotspot.target)} // Use the new handleClick function
            onPointerOver={handlePointerOver} // Change cursor on hover
            onPointerOut={handlePointerOut} // Reset cursor on hover out
            scale={[1, 1, 1]}
          >
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial
              color="blue"
              emissive="blue"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Hotspot Label */}
          <Text
            position={[0, 1, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {hotspot.label}
          </Text>
        </group>
      ))}
    </>
  )
}

export default function SceneViewer({ room }: { room: string }) {
  return (
    <div className="relative h-full w-full">
      <Canvas>
        <Suspense fallback={<Loader />}>
          {/* OrbitControls for interactive navigation */}
          <OrbitControls
            enableZoom={false}
            zoomSpeed={20}
            minDistance={0}
            maxDistance={500}
            enablePan={false}
            minPolarAngle={Math.PI / 2 - Math.PI / 6}
            maxPolarAngle={Math.PI / 2 + Math.PI / 6}
            rotateSpeed={-0.5}
          />

          {/* Room Scene */}
          <RoomScene room={room} />
        </Suspense>
      </Canvas>

      {/* Info Panel */}
      <InfoPanel title={rooms[room].title} description={rooms[room].desc} />
    </div>
  )
}

export function Loader() {
  return (
    <Html>
      <Spinner />
    </Html>
  )
}
