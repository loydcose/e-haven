import { Canvas, useLoader } from "@react-three/fiber"
import { BackSide, TextureLoader } from "three"
import { OrbitControls, Text } from "@react-three/drei"
import { useRouter } from "next/navigation"
import InfoPanel from "./info-panel"
import { Suspense } from "react"

type Hotspot = {
  position: [number, number, number] // Position of the hotspot in 3D space
  target: string // Target room to navigate to
  label: string // Label for the hotspot
}

type Rooms = {
  [key: string]: {
    src: string
    title: string
    desc: string
    hotspots: Hotspot[] // Array of hotspots for the room
  }
}

const rooms: Rooms = {
  "living-room": {
    src: "/textures/living-room.jpg",
    title: "Living Room",
    desc: "This is our cozy living room.",
    hotspots: [
      {
        position: [0, 0, -10],
        target: "living-room-2",
        label: "Go to Living Room 2",
      },
      {
        position: [5, 0, -10],
        target: "living-room-3",
        label: "Go to Living Room 3",
      },
    ],
  },
  "living-room-2": {
    src: "/textures/living-room-2.jpg",
    title: "Living Room 2",
    desc: "This is our second living room.",
    hotspots: [
      {
        position: [-5, 0, -10],
        target: "living-room",
        label: "Back to Living Room",
      },
    ],
  },
  "living-room-3": {
    src: "/textures/living-room-3.jpg",
    title: "Living Room 3",
    desc: "This is our third living room.",
    hotspots: [
      {
        position: [0, 5, -10],
        target: "living-room",
        label: "Back to Living Room",
      },
      {
        position: [5, 0, -10],
        target: "living-room-2",
        label: "Go to Living Room 2",
      },
    ],
  },
}

function RoomScene({ room }: { room: string }) {
  const router = useRouter()
  const texture = useLoader(
    TextureLoader,
    rooms[room]?.src || "/textures/living-room.jpg"
  )

  return (
    <>
      {/* 360 Sphere */}
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>

      {/* Floating Buttons (Hotspots) */}
      {rooms[room]?.hotspots.map((hotspot, index) => (
        <group key={index} position={hotspot.position}>
          {/* Hotspot Button */}
          <mesh
            onClick={() =>
              router.push(`/virtual-tour/test?room=${hotspot.target}`)
            } // Redirect to the target room
            scale={[1, 1, 1]} // Adjust the size of the hotspot
          >
            <sphereGeometry args={[0.5, 32, 32]} /> {/* Hotspot shape */}
            <meshStandardMaterial
              color="blue"
              emissive="blue"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Hotspot Label */}
          <Text
            position={[0, 1, 0]} // Position the text above the hotspot
            fontSize={0.5} // Adjust the font size
            color="white" // Text color
            anchorX="center" // Center the text horizontally
            anchorY="middle" // Center the text vertically
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
        <Suspense fallback={null}>
          {/* OrbitControls for interactive navigation */}
          <OrbitControls
            enableZoom={false} // Enable zooming
            zoomSpeed={20} // Increase zoom sensitivity
            minDistance={0} // Set minimum zoom distance
            maxDistance={500} // Set maximum zoom distance
            enablePan={false} // Disable panning to prevent unintended movement
            minPolarAngle={Math.PI / 2 - Math.PI / 6} // Limit vertical movement
            maxPolarAngle={Math.PI / 2 + Math.PI / 6}
            rotateSpeed={-0.5} // Reverse rotation direction
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
