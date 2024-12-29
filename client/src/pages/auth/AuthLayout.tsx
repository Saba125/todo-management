import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const AuthLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [localStorage.getItem("token")])

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
