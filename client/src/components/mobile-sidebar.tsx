import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import Sidebar from "./side-bar"
import { useParams } from "react-router-dom"
const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 bg-neutral-100" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
