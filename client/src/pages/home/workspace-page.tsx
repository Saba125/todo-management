import ProjectForm from "@/components/create-project-form"
import React from "react"
import { useParams } from "react-router-dom"
const WorkspacePage = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Workspace ID: {id}</h1>
      <ProjectForm />
    </div>
  )
}

export default WorkspacePage
