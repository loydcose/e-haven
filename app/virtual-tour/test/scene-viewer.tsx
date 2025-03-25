import { Canvas, useLoader } from "@react-three/fiber"
import { BackSide, TextureLoader } from "three"
import { OrbitControls } from "@react-three/drei"
import { useRouter } from "next/navigation"
import NavigationHotspot from "./navigation-hotspot"
import InfoPanel from "./info-panel"

type Rooms = {
  [key: string]: {
    src: string
    next: string
    title: string
    desc: string
  }
}

const rooms: Rooms = {
  "living-room": {
    src: "/textures/living-room.jpg",
    next: "living-room-2",
    title: "Living Room",
    desc: "This is our cozy living room.",
  },
  "living-room-2": {
    src: "/textures/living-room-2.jpg",
    next: "living-room",
    title: "Living Room 2",
    desc: "This is our second living room.",
  },
}

export default function SceneViewer({ room }: { room: string }) {
  const router = useRouter()
  const texture = useLoader(
    TextureLoader,
    rooms[room]?.src || "/textures/living-room.jpg"
  )

  return (
    <div className="relative h-full w-full">
      <Canvas>
        {/* OrbitControls for interactive navigation */}
        <OrbitControls
          enableZoom={true} // Disable zooming to maintain 360 view
          enablePan={false} // Disable panning to prevent unintended movement
          minPolarAngle={Math.PI / 2 - Math.PI / 6} // Limit vertical movement
          maxPolarAngle={Math.PI / 2 + Math.PI / 6}
          rotateSpeed={-0.5} // Reverse rotation direction
        />

        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={BackSide} />
        </mesh>
      </Canvas>

      {/* Navigation Hotspot */}
      <NavigationHotspot
        onClick={() =>
          router.push(`/virtual-tour/test?room=${rooms[room].next}`)
        }
      />

      {/* Info Panel */}
      <InfoPanel title={rooms[room].title} description={rooms[room].desc} />
    </div>
  )
}
