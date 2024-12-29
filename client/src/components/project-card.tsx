import React from "react"
import WorkspaceAvatar from "./workspace-avatar"
import { Card } from "./ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
interface ProjectCardProps {
  data: {
    _id: string
    name: string
    image: string
    workspaceId: string
  }
}
const ProjectCard = ({ data }: ProjectCardProps) => {
  const href = `/workspaces/${data.workspaceId}/projects/${data._id}`
  return (
    <Card className="mt-3 cursor-pointer">
      <Link to={href} className="flex items-center gap-x-3">
        <WorkspaceAvatar image={data.image} name={data.name} />
        <p className="text-sm text-neutral-500">{data.name}</p>
      </Link>
    </Card>
  )
}

export default ProjectCard
