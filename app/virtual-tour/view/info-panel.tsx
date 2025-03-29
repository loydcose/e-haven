import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function InfoPanel({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="absolute top-5 left-5 bg-white p-4 rounded-lg shadow-md">
      <Link href="/virtual-tour" className="text-blue-600 hover:underline text-sm mb-4 flex items-center gap-2"><ArrowLeft size={14} /> Back to virtual tour</Link>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
