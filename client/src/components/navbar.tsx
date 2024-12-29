import { useWorkspaceState } from "@/hooks/zustand"
import MobileSidebar from "./mobile-sidebar"
import { Button } from "./ui/button"
import UserButton from "./user-button"

const Navbar = () => {
  return (
    <nav className="w-full p-3 flex items-center justify-between">
      <div className="block md:invisible">
        <MobileSidebar />
      </div>
      <div className="self-end">
        <UserButton />
      </div>
    </nav>
  )
}

export default Navbar
