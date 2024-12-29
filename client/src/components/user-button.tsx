import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useShowMe } from "@/hooks/auth/use-show-me"
import { useNavigate } from "react-router-dom"

const UserButton = () => {
  const { data } = useShowMe()
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem("token")
    navigate("/auth/register")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-[50px] bg-neutral-500 cursor-pointer">
          <AvatarFallback>{data?.user?.username?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <DropdownMenuLabel>{data?.user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>My Workspaces</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
