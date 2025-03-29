export type Hotspot = {
  position: [number, number, number] // Position of the hotspot in 3D space
  target: string // Target room to navigate to
  label: string // Label for the hotspot
}

export type Rooms = {
  [key: string]: {
    src: string
    title: string
    desc: string
    hotspots: Hotspot[] // Array of hotspots for the room
  }
}

export const rooms: Rooms = {
  entrance: {
    src: "https://e-haven-images.pages.dev/entrance-1.jpg",
    title: "Entrance",
    desc: "Entrance going to resort",
    hotspots: [
      {
        position: [-5, 0, -10],
        target: "main-entrance",
        label: "Go to main entrance",
      },
    ],
  },
  "main-entrance": {
    src: "https://e-haven-images.pages.dev/entrance-2.jpg",
    title: "Main Entrance",
    desc: "Main entrance going to resort",
    hotspots: [
      {
        position: [-5, 0, -10],
        target: "upper-swimming-pool",
        label: "Go to upper swimming pool",
      },
      {
        position: [-20, 0, -10],
        target: "entrance",
        label: "Back to entrance",
      },
    ],
  },
  "upper-swimming-pool": {
    src: "https://e-haven-images.pages.dev/swimming-pool-2.jpg",
    title: "Upper Swimming Pool",
    desc: "Big 6ft pool",
    hotspots: [
      {
        position: [0, 0, -10],
        target: "main-entrance",
        label: "Back to main entrance",
      },
      {
        position: [5, 0, -10],
        target: "cottage-5",
        label: "Go to cottage 5",
      },
    ],
  },
  "cottage-5": {
    src: "https://e-haven-images.pages.dev/cottage-4.jpg",
    title: "Cottage 5",
    desc: "Cottage 5 with 4 beds",
    hotspots: [
      {
        position: [-5, 0, -10],
        target: "comfort-rooms",
        label: "Go to comfort rooms",
      },
      {
        position: [-20, 0, -10],
        target: "upper-swimming-pool",
        label: "Back to upper swimming pool",
      },
    ],
  },
  "comfort-rooms": {
    // fix image typo "confort"
    src: "https://e-haven-images.pages.dev/confort-rooms.jpg",
    title: "Comfort Rooms",
    desc: "These are the comfort rooms beside kitchen",
    hotspots: [
      {
        position: [-5, 0, -10],
        target: "cottage-5",
        label: "Back to cottage 5",
      },
    ],
  },
}