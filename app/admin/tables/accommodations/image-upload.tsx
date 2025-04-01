"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import React, { useRef, useState } from "react"

export default function ImageUpload() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null) // Reference to the file input

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null) // Clear the image preview
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Reset the file input value
    }
  }

  return (
    <div>
      <div className="mb-4">
        {/* Display the uploaded image */}
        {imagePreview ? (
          <div className="flex items-start gap-2">
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className="w-full rounded-md shadow-md"
            />
            <Button
              type="button"
              size={"icon"}
              className="rounded-full shrink-0"
              variant={"ghost"}
              onClick={handleRemoveImage} // Remove the image on click
            >
              <X />
            </Button>
          </div>
        ) : null}
      </div>

      <Label htmlFor="image-upload">Image</Label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef} // Attach the ref to the input
      />
    </div>
  )
}
