import DeleteWorkspace from "@/components/delete-workspace-form"
import EditWorkspaceForm from "@/components/edit-workspace-form"
import { useGetSingleWorkspace } from "@/hooks/workspace/use-get-single-workspace"
import React from "react"
import { useParams } from "react-router-dom"

const WorkspacePageSettings = () => {
  const { id } = useParams()
  const { data } = useGetSingleWorkspace(id!)
  return (
    <div className="">
      <EditWorkspaceForm data={data?.workspace} />
      <DeleteWorkspace />
    </div>
  )
}

export default WorkspacePageSettings
