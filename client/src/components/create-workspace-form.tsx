import { useEffect, useRef } from "react"
import { Dialog, DialogTitle } from "@radix-ui/react-dialog"
import { DialogContent, DialogHeader } from "./ui/dialog"
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

const WorkspaceForm = () => {
  const { isOpen, onClose } = useWorkspaceState()
  const { data } = useShowMe()
  const { mutate } = useCreateWorkspace()
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  })

  function onSubmit(values: z.infer<typeof workspaceSchema>) {
    mutate(values)
  }

  function handleImageUpload(url: string) {
    form.setValue("image", url)
  }

  // Function to trigger the Cloudinary upload widget
  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dobivcvi5", // Replace with your Cloudinary cloud name
        uploadPreset: "management", // Replace with your Cloudinary upload preset
        sources: ["local", "url", "camera"],
        multiple: false,
        showAdvancedOptions: true,
        cropping: true,
        maxFileSize: 1000000, // 1 MB max size
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
    <Dialog onOpenChange={onClose} modal={false} open={isOpen}>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-bold">
            Create a new workspace
          </DialogTitle>
        </DialogHeader>
        <DottedSeparator />
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
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default WorkspaceForm
