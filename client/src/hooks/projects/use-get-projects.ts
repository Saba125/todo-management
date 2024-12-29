import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_BASE_URL } from "../../constants/ApiConstant"

export const useGetProjects = (id: string) => {
  const query = useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      const token = localStorage.getItem("token")?.trim()

      const response = await axios.get(`${API_BASE_URL}/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data // Ensure this is within the function scope
    },
    enabled: !!id, // Only fetch if `id` is defined
  })

  return query
}
