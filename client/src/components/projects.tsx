import { useGetProjects } from "@/hooks/projects/use-get-projects"
import { useProjectsState } from "@/hooks/zustand"
import { PlusIcon } from "lucide-react"
import React from "react"
import ProjectCard from "./project-card"
import Loading from "./Loading"
interface Projects {
  workspaceId: string | undefined
}
const Projects = ({ workspaceId }: Projects) => {
  const { onOpen, isOpen } = useProjectsState()
  const { data, isLoading } = useGetProjects(workspaceId!)

  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="uppercase    text-sm text-neutral-500">projects</h3>
        <div
          onClick={onOpen}
          className="flex cursor-pointer rounded-full justify-center items-center p-1 bg-neutral-500"
        >
          <PlusIcon className="text-white size-4" />
        </div>
      </div>
      {data?.projects?.map((project: any) => (
        <ProjectCard key={project._id} data={project} />
      ))}
    </div>
  )
}

export default Projects
