import { useMutation } from "@tanstack/react-query"
import { TRegister } from "./types"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../constants/ApiConstant"
import { useNavigate } from "react-router-dom"
export const useRegister = () => {
  const navigate = useNavigate()
  const mutate = useMutation({
    mutationFn: async (data: TRegister) => {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data)
      return response.data
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
      toast.success("Successfully registered")
      navigate("/")
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })
  return mutate
}
