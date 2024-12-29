import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../constants/ApiConstant"
import { useWorkspaceState } from "../zustand"
export const useJoinWorkspace = (id: string) => {
  const { onClose } = useWorkspaceState()
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async (inviteCode: string) => {
      const token = localStorage.getItem("token")?.trim()
      const response = await axios.post(
        `${API_BASE_URL}/workspace/join/${id}`,
        { inviteCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    },
    onSuccess: (data) => {
      toast.success("Succesffully joined workspace")
      onClose()
      queryClient.invalidateQueries(["workspaces"])
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })
  return mutate
}
