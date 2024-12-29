import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

export const UploadWidget = ({
  onUpload,
}: {
  onUpload: (url: string) => void
}) => {
  const cloudinaryRef = useRef<any>()
  const widgetRef = useRef<any>()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dobivcvi5",
        uploadPreset: "management",
        showCompletedButton: true,
        multiple: false,
      },
      function (error: any, result: any) {
        if (error) {
          console.error("Upload Error:", error)
        } else if (result?.event === "success" && result.info?.secure_url) {
          setUploadedImage(result.info.secure_url) // Set the uploaded image URL
          onUpload(result.info.secure_url) // Update the parent component with the uploaded URL
        }
      }
    )
  }, [onUpload])

  return (
    <div>
      {/* Image Preview */}
      {uploadedImage ? (
        <img
          src={uploadedImage}
          alt="Uploaded Image"
          className=" object-cover rounded-lg"
        />
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation()
            widgetRef.current?.open()
          }}
          className="bg-neutral-100 cursor-pointer flex items-center justify-center size-[80px] rounded-full"
        >
          <Plus />
        </div>
      )}
    </div>
  )
}
