import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_BASE_URL } from "../../constants/ApiConstant"
export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const token = localStorage.getItem("token")?.trim()

      const response = await axios.get(`${API_BASE_URL}/workspace`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
  })

  return query
}
