import React from "react"
import SceneViewer from "./scene-viewer"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const room = (await searchParams)?.room

  return (
    <main className="size-full">
      <SceneViewer room={room as string} />
    </main>
  )
}
