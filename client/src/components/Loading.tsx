import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Loader className="animate-spin text-primary" />
    </div>
  )
}

export default Loading
