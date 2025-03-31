"use client"

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const Map = () => {
  console.log({apiKey})
  const center = {
    lat: 14.652739,
    lng: 121.221169,
  }

  return (
    <LoadScript googleMapsApiKey={apiKey || ""}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={center}
        zoom={15}
        options={{
          disableDefaultUI: true, // Disable default UI for a cleaner look
          zoomControl: true, // Enable zoom control
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
