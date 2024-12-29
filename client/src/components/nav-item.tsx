import { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"
interface NavItemProps {
  label: string
  href: string
  icon: LucideIcon
}
const NavItem = ({ label, href, icon: Icon }: NavItemProps) => {
  return (
    <Link
      to={href}
      className="flex items-center gap-x-3    transition-all cursor-pointer"
    >
      {<Icon className="size-4 text-neutral-500" />}
      <span className="text-[14px] text-neutral-500">{label}</span>
    </Link>
  )
}

export default NavItem
