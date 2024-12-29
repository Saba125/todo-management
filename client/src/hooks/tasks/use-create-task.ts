import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../constants/ApiConstant"
import { useWorkspaceState } from "../zustand"
export const useCreateTask = () => {
  const { onClose } = useWorkspaceState()
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async (data: any) => {
      const token = localStorage.getItem("token")?.trim()
      const response = await axios.post(`${API_BASE_URL}/task`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    onSuccess: (data) => {
      toast.success("Task created")
      onClose()
      queryClient.invalidateQueries(["tasks"])
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })
  return mutate
}
