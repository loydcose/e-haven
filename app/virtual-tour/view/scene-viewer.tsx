"use client"

import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import { BackSide, TextureLoader, Vector3 } from "three"
import { Html, OrbitControls, Text } from "@react-three/drei"
import { useRouter } from "next/navigation"
import InfoPanel from "./info-panel"
import { Suspense, useState, useRef } from "react"
import Spinner from "./spinner"
import { rooms } from "./rooms"

function RoomScene({ room, isDebugMode }: { room: string; isDebugMode: boolean }) {
  const router = useRouter()
  const [debugPosition, setDebugPosition] = useState<Vector3 | null>(null)
  const textRefs = useRef<any[]>([])

  // Update text orientation every frame
  useFrame(({ camera }) => {
    textRefs.current.forEach((text) => {
      if (text) {
        text.lookAt(camera.position)
      }
    })
  })

  const texture = useLoader(
    TextureLoader,
    rooms[room]?.src || "/textures/living-room.jpg"
  )

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer"
  }

  const handlePointerOut = () => {
    document.body.style.cursor = "default"
  }

  const handleClick = (target: string) => {
    document.body.style.cursor = "default"
    router.push(`/virtual-tour/view?room=${target}`)
  }

  // Add debug click handler
  const handleDebugClick = (event: any) => {
    if (!isDebugMode) return

    // Get the click position in 3D space
    const position = new Vector3()
    position.copy(event.point)
    
    // Scale down the coordinates to match hotspot scale
    // Divide by 50 to get coordinates in a similar range to your working hotspots
    const x = Math.round(position.x / 50)
    const y = Math.round(position.y / 50)
    const z = Math.round(position.z / 50)
    
    setDebugPosition(new Vector3(x, y, z))
    console.log(`Position: [${x}, ${y}, ${z}]`)
  }

  return (
    <>
      {/* Debug overlay */}
      {isDebugMode && debugPosition && (
        <Html position={[0, 20, 0]}>
          <div className="bg-black/80 text-white p-2 rounded">
            Position: [{debugPosition.x}, {debugPosition.y}, {debugPosition.z}]
          </div>
        </Html>
      )}

      {/* Clickable debug plane */}
      {isDebugMode && (
        <mesh onClick={handleDebugClick}>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial transparent opacity={0} side={BackSide} />
        </mesh>
      )}

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
            onClick={() => handleClick(hotspot.target)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
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
            ref={(el) => (textRefs.current[index] = el)}
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
  const [isDebugMode, setIsDebugMode] = useState(false)

  return (
    <div className="relative h-full w-full">
      {/* Debug Mode Toggle */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => setIsDebugMode(!isDebugMode)}
          className="absolute top-4 right-4 z-50 bg-black/50 text-white px-4 py-2 rounded"
        >
          {isDebugMode ? "Exit Debug" : "Debug Mode"}
        </button>
      )}

      <Canvas>
        <Suspense fallback={<Loader />}>
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

          <RoomScene room={room} isDebugMode={isDebugMode} />
        </Suspense>
      </Canvas>

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
