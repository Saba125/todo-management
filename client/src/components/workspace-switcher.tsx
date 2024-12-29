import React from "react"
import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetWorkspaces } from "@/hooks/workspace/use-get-workspaces"
import WorkspaceAvatar from "./workspace-avatar"
import Loading from "./Loading"
import { useWorkspaceState } from "@/hooks/zustand"
import { useNavigate, useParams } from "react-router-dom"

const WorkspaceSwitcher = () => {
  const { onOpen } = useWorkspaceState()
  const { id } = useParams()
  console.log(id)
  const { data, isLoading } = useGetWorkspaces()
  const navigate = useNavigate()
  if (isLoading) {
    return <Loading />
  }
  const onValueChange = (id: string) => {
    navigate(`/workspaces/${id}`)
  }
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h3 className="uppercase    text-sm text-neutral-500">workspaces</h3>
        <div
          onClick={onOpen}
          className="flex cursor-pointer rounded-full justify-center items-center p-1 bg-neutral-500"
        >
          <PlusIcon className="text-white size-4" />
        </div>
      </div>
      <div className="mt-3">
        <Select onValueChange={onValueChange} value={id}>
          <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
            <SelectValue placeholder="No workspace  selected" />
          </SelectTrigger>
          <SelectContent>
            {data.workspaces.map((workspace: any) => (
              <SelectItem value={workspace._id} key={workspace._id}>
                <div className="flex justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default WorkspaceSwitcher
