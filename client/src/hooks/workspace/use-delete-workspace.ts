import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../constants/ApiConstant"
import { useNavigate } from "react-router-dom"
export const useDeleteWorkspace = (id: string) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token")?.trim()
      const response = await axios.delete(`${API_BASE_URL}/workspace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    onSuccess: () => {
      toast.success("Workspace deleted")
      navigate("/")
      queryClient.invalidateQueries(["workspace"])
    },
    onError: (err: any) => {
      const errorMessage = err.response?.data?.msg || "Something went wrong!"
      toast.error(errorMessage)
    },
  })
  return mutate
}
