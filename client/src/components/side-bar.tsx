import {
  ClipboardList,
  Home,
  Calendar,
  Folder,
  Settings,
  AccessibilityIcon,
  ArrowRight,
} from "lucide-react"
import NavItem from "./nav-item"
import Logo from "./Logo"
import DottedSeparator from "./dotted-seperator"
import UserButton from "./user-button"
import WorkspaceSwitcher from "./workspace-switcher"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Projects from "./projects"
const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "My tasks",
    href: "/tasks",
    icon: Folder,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Join",
    href: "/join",
    icon: ArrowRight,
  },
]
const Sidebar = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div className="bg-neutral-100 flex justify-between flex-col gap-y-5  p-3  h-full">
      <div className="flex flex-col gap-y-5">
        <Logo />
        <DottedSeparator />
        <WorkspaceSwitcher />
        <DottedSeparator />
        <div className="flex  flex-col gap-y-5">
          {/* {routes.map((route) => {
            return
            <NavItem
              key={route.label}
              label={route.label}
              href={route.href}
              icon={route.icon}
            />
          ))}} */}

          {routes.map((route) => {
            const fullHref = `/workspaces/${id}${route.href}`
            return (
              <NavItem
                key={route.label}
                label={route.label}
                icon={route.icon}
                href={fullHref}
              />
            )
          })}
          <DottedSeparator />
          <Projects workspaceId={id} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
