import { useParams } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useDeleteWorkspace } from "@/hooks/workspace/use-delete-workspace"

const DeleteWorkspace = () => {
  const { id } = useParams()
  const { mutate } = useDeleteWorkspace(id!)
  return (
    <div className="flex items-center justify-center mt-5">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>
            <h3 className="text-lg font-bold">Danger zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will remove all
              associated data.
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Button variant="destructive" onClick={() => mutate()}>
            Delete workspace
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default DeleteWorkspace
