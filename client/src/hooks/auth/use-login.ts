import { useMutation } from "@tanstack/react-query"
import { TLogin } from "./types"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../constants/ApiConstant"
import { useNavigate } from "react-router-dom"
export const useLogin = () => {
  const navigate = useNavigate()
  const mutate = useMutation({
    mutationFn: async (data: TLogin) => {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data)
      return response.data
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
      toast.success("Successfully logged in ")
      navigate("/")
    },
    onError: () => {
      toast.error("Email or password is incorrect")
    },
  })
  return mutate
}
