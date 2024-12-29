import { useEffect } from "react"
import { useShowMe } from "../../hooks/auth/use-show-me"
import { Outlet, useNavigate } from "react-router-dom"
import Loading from "../../components/Loading"
import Sidebar from "../../components/side-bar"
import Navbar from "@/components/navbar"
import { useGetWorkspaces } from "@/hooks/workspace/use-get-workspaces"
import { useWorkspaceState } from "@/hooks/zustand"

const HomeLayout = () => {
  const navigate = useNavigate()
  const { onOpen } = useWorkspaceState()
  const { data, isLoading } = useGetWorkspaces()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/register")
      return
    }

    if (data?.workspaces?.length === 0) {
      onOpen()
    } else if (data?.workspaces?.length > 0) {
      navigate(`workspaces/${data?.workspaces[0]?._id}`)
    }
  }, [data, navigate, onOpen])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen">
      <div className="hidden md:block h-full fixed top-0 left-0 w-[256px] z-10">
        <Sidebar />
      </div>
      <div className="md:pl-[256px]">
        <Navbar />
      </div>
      <div
        className={`h-full ${
          data?.workspaces?.length > 0 ? "md:pl-[256px]" : ""
        } w-full`}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout
