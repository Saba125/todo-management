import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useJoinWorkspace } from "@/hooks/workspace/use-join-workspace"
import React, { ChangeEvent, useState } from "react"
import { useParams } from "react-router-dom"

const WorkspaceInviteJoin = () => {
  const [inviteCode, setInviteCode] = useState("")
  const { id } = useParams()
  const { mutate } = useJoinWorkspace(id!)
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInviteCode(event.target.value)
  }
  const handleJoin = () => {
    mutate(inviteCode)
  }
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>
            <h3 className="text-lg font-bold">Join the Workspace</h3>
            <p className="text-sm text-muted-foreground">
              Accept the invitation to join this workspace and start
              collaborating with your team.
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input onChange={handleValueChange} />
          <div className="flex items-end justify-end mt-3">
            <Button onClick={handleJoin}>Join</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WorkspaceInviteJoin
