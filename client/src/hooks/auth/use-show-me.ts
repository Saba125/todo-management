import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_BASE_URL } from "../../constants/ApiConstant"
export const useShowMe = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const token = localStorage.getItem("token")?.trim()

      const response = await axios.get(`${API_BASE_URL}/auth/showMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
  })

  return query
}
