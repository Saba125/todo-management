import CreateTaskForm from "@/components/create-task-form"
import { Button } from "@/components/ui/button"
import { useTasksState } from "@/hooks/zustand"
import React from "react"
import { useParams } from "react-router-dom"

const ProjectsPage = () => {
  const { workspaceId } = useParams()
  const { onOpen } = useTasksState()
  return (
    <div className="w-full p-3">
      {/* Header */}
      <div className="w-full mt-5 flex justify-between items-center">
        <div></div>
        <Button onClick={onOpen}>Create</Button>
        <CreateTaskForm />
      </div>
    </div>
  )
}

export default ProjectsPage
