import { useEffect, useRef } from "react"
import DottedSeparator from "./dotted-seperator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { workspaceSchema } from "@/schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useWorkspaceState } from "@/hooks/zustand"
import { useShowMe } from "@/hooks/auth/use-show-me"
import { useCreateWorkspace } from "@/hooks/workspace/use-create-workspace"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import Loading from "./Loading"
import { useEditWorkspace } from "@/hooks/workspace/use-edit-workspace"
import { useParams } from "react-router-dom"
interface EditWorkspaceFormProps {
  data: {
    name: string
    image: string
    user: string
    inviteCode: string
  }
}
const EditWorkspaceForm = ({ data }: EditWorkspaceFormProps) => {
  if (!data) {
    return <Loading />
  }
  const { isOpen, onClose } = useWorkspaceState()
  const { id } = useParams()
  const { mutate } = useEditWorkspace(id!)
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: data?.name,
      image: data?.image,
    },
  })

  function onSubmit(values: z.infer<typeof workspaceSchema>) {
    mutate(values)
  }

  function handleImageUpload(url: string) {
    form.setValue("image", url)
  }

  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dobivcvi5",
        uploadPreset: "management",
        sources: ["local", "url", "camera"],
        multiple: false,
        showAdvancedOptions: true,
        cropping: true,
        maxFileSize: 1000000,
        format: "jpeg,png,jpg,svg",
      },
      (error: any, result: any) => {
        if (result.event === "success") {
          handleImageUpload(result.info.secure_url)
        }
      }
    )
    widget.open()
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>
            <h3 className="text-lg font-bold">Workspace settings</h3>
            <p className="text-sm text-muted-foreground">
              Update your workspace details and upload a new icon.
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                          <img
                            alt="logo"
                            className="object-cover"
                            src={
                              typeof field.value === "string"
                                ? field.value
                                : URL.createObjectURL(field.value)
                            }
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className="flex flex-col ">
                        <p className="text-sm">Workspace icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG, JPEG, max 1mb
                        </p>
                        <Button
                          type="button"
                          variant="teritary"
                          size="xs"
                          className="w-fit mt-2"
                          onClick={openCloudinaryWidget} // Open Cloudinary upload widget
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              />
              <div className="flex justify-end items-center gap-x-3">
                <Button type="button" onClick={onClose} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Edit</Button>
              </div>
            </form>
          </Form>
          <div>
            <h3 className="text-lg font-bold mb-3">Invite code</h3>
            <Input value={data.inviteCode} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditWorkspaceForm
