import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../constants/ApiConstant"
import { useNavigate } from "react-router-dom"
export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_BASE_URL}/auth/logout`)
      return response.data
    },
    onSuccess: () => {
      localStorage.removeItem("token")
      toast.success("Successfully logged out")
      navigate("/auth/register")
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })
  return mutate
}
