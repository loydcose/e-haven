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
    src: "https://e-haven-images.pages.dev/entrance.jpg",
    title: "Entrance",
    desc: "Entrance going to resort",
    hotspots: [
      { 
        position: [7, 1, 7],
        target: "main-entrance",
        label: "Main Entrance",
      },
    ],
  },
  "main-entrance": {
    src: "https://e-haven-images.pages.dev/main-entrance.jpg",
    title: "Main Entrance",
    desc: "Main entrance going to resort",
    hotspots: [
      {
        position: [-6, -1, -8],
        target: "entrance",
        label: "Entrance",
      },
      {
        position: [4, 2, 9],
        target: "lower-swimming-pool",
        label: "Lower Swimming Pool",
      },
    ],
  },
  "lower-swimming-pool": {
    src: "https://e-haven-images.pages.dev/lower-swimming-pool.jpeg",
    title: "Upper Swimming Pool",
    desc: "Big 6ft pool",
    hotspots: [
      {
        position: [4, -3, -9],
        target: "main-entrance",
        label: "Main Entrance",
      },
      {
        position: [-9, 3, 3],
        target: "upper-swimming-pool",
        label: "Upper swimming pool",
      },
      {
        position: [0, 1, 10],
        target: "cozy-hut-cottage",
        label: "Cozy hut cottage",
      },
    ],
  },
  "upper-swimming-pool": {
    src: "https://e-haven-images.pages.dev/upper-swimming-pool.jpg",
    title: "Upper Swimming Pool",
    desc: "Big 6ft pool",
    hotspots: [
      {
        position: [8, -4, -4],
        target: "lower-swimming-pool",
        label: "Lower swimming pool",
      },
      {
        position: [-5, 4, 8],
        target: "billiards",
        label: "Billiards",
      },
    ],
  },
  "billiards": {
    src: "https://e-haven-images.pages.dev/billiards.jpg",
    title: "Upper Swimming Pool",
    desc: "Big 6ft pool",
    hotspots: [
      {
        position: [-10, -1, -2],
        target: "upper-swimming-pool",
        label: "Upper swimming pool",
      },
      {
        position: [2, 3, -9],
        target: "overlooking-hut-cottage",
        label: "Overlooking hut cottage",
      },
    ],
  },
  "overlooking-hut-cottage": {
    src: "https://e-haven-images.pages.dev/overlooking-hut-cottage.jpeg",
    title: "Upper Swimming Pool",
    desc: "Big 6ft pool",
    hotspots: [
      {
        position: [6, -2, 8],
        target: "billiards",
        label: "Billiards",
      },
      {
        position: [-9, -4, 0],
        target: "basketball",
        label: "Basketball",
      },
    ],
  },
    "basketball": {
    src: "https://e-haven-images.pages.dev/basketball.jpg",
    title: "Upper Swimming Pool",
    desc: "Big 6ft pool",
    hotspots: [
      {
        position: [7, 7, 5],
        target: "overlooking-hut-cottage",
        label: "Overlooking hut cottage",
      },
      {
        position: [-9, -3, -1],
        target: "comfort-rooms",
        label: "Comfort rooms",
      },
    ],
  },
   "comfort-rooms": {
    src: "https://e-haven-images.pages.dev/comfort-rooms.jpg",
    title: "Comfort Rooms",
    desc: "These are the comfort rooms beside kitchen",
    hotspots: [
      {
        position: [-2, -3, -9],
        target: "kitchen",
        label: "Back to entrance",
      },
      {
        position: [-7, 4, 5],
        target: "basketball",
        label: "Basketball",
      },
    ],
  },
  "kitchen": {
    src: "https://e-haven-images.pages.dev/kitchen.jpeg",
    title: "Upper Swimming Pool",
    desc: "Big 6ft pool",
    hotspots: [
      {
        position: [-10, 0, 1],
        target: "comfort-rooms",
        label: "Comfort rooms",
      },
      {
        position: [8, -2, 6],
        target: "family-house-nipa-cottage",
        label: "Family house nipa cottage",
      },
    ],
  },
  "family-house-nipa-cottage": {
    src: "https://e-haven-images.pages.dev/family-house-nipa-cottage.jpeg",
    title: "Upper Swimming Pool",
    desc: "Big 6ft pool",
    hotspots: [
      {
        position: [2, 1, -10],
        target: "kitchen",
        label: "Kitchen",
      },
      {
        position: [0, 0, 10],
        target: "cozy-hut-cottage",
        label: "Cozy hut cottage",
      },
    ],
  },
  "cozy-hut-cottage": {
    src: "https://e-haven-images.pages.dev/cozy-hut-cottage.jpg",
    title: "Cottage 5",
    desc: "Cottage 5 with 4 beds",
    hotspots: [
      {
        position: [2, -1, 10],
        target: "family-house-nipa-cottage",
        label: "Family house nipa cottage",
      },
      {
        position: [-8, -1, -6],
        target: "lower-swimming-pool",
        label: "Lower swimming pool",
      },
    ],
  },
}