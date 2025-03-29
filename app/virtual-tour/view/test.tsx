"use client";

import { useSearchParams } from "next/navigation";
import SceneViewer from "./scene-viewer";

export default function View360() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room"); 

  return (
    <div className="h-screen w-screen">
      {room ? <SceneViewer room={room} /> : <p>Loading...</p>}
    </div>
  );
}