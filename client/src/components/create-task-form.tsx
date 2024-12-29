import { useEffect, useRef } from "react"
import { DialogContent, Dialog, DialogTitle, DialogHeader } from "./ui/dialog"
import DottedSeparator from "./dotted-seperator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { projectSchema, taskSchema, workspaceSchema } from "@/schemas"
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
import {
  useProjectsState,
  useTasksState,
  useWorkspaceState,
} from "@/hooks/zustand"
import { useShowMe } from "@/hooks/auth/use-show-me"
import { useCreateWorkspace } from "@/hooks/workspace/use-create-workspace"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { ImageIcon } from "lucide-react"
import { useParams } from "react-router-dom"
import { useCreateProject } from "@/hooks/projects/use-create-project"
import { useCreateTask } from "@/hooks/tasks/use-create-task"

const CreateTaskForm = () => {
  const { isOpen, onClose } = useTasksState()
  const { mutate } = useCreateTask()
  const { id } = useParams()
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      projectId: "",
      completed: false,
    },
  })

  function onSubmit(values: z.infer<typeof taskSchema>) {
    mutate(values)
  }

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Create a new task</DialogTitle>
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

export default CreateTaskForm
