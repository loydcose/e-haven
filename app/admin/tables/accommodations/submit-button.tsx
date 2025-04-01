import { Button } from "@/components/ui/button"
import { Fields } from "./accommodations-action"

export default function SubmitButton({
  accommodationId,
  fields,
}: {
  accommodationId: string
  fields: Fields
}) {
  const handleClick = () => {
    console.log(accommodationId)
    console.log(fields)
  }

  return (
    <Button type="button" onClick={handleClick}>
      {"Save changes"}
    </Button>
  )
}
