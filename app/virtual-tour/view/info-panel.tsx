export default function InfoPanel({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="absolute top-5 left-5 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
