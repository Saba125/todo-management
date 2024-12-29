import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../constants/ApiConstant"
import { useWorkspaceState } from "../zustand"
export const useEditWorkspace = (id: string) => {
  const { onClose } = useWorkspaceState()
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async (data: any) => {
      const token = localStorage.getItem("token")?.trim()
      const response = await axios.put(
        `${API_BASE_URL}/workspace/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    },
    onSuccess: (data) => {
      toast.success("Workspace edited")
      onClose()
      queryClient.invalidateQueries(["workspace"])
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })
  return mutate
}
