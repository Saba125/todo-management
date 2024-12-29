import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./pages/auth/AuthLayout"
import RegisterPage from "./pages/auth/register/index"
import LoginPage from "./pages/auth/login/index"
import HomeLayout from "./pages/home/HomeLayout"
import { Dashboard } from "./pages/home/dashboard"
import WorkspacePage from "./pages/home/workspace-page"
import WorkspacePageSettings from "./pages/home/workspace-page-settings"
import WorkspaceSwitcher from "./components/workspace-switcher"
import WorkspaceInviteJoin from "./pages/home/workspace-invite-join"
import ProjectsPage from "./pages/home/projects-page"

const router = createBrowserRouter([
  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "workspaces/:id/dashboard",
        element: <Dashboard />,
      },
      {
        path: "workspaces/:id/projects/:workspaceId",
        element: <ProjectsPage />,
      },
      {
        path: "workspaces/:id",
        element: <WorkspacePage />,
      },
      {
        path: "workspaces/:id/settings",
        element: <WorkspacePageSettings />,
      },
      {
        path: "workspaces/:id/join",
        element: <WorkspaceInviteJoin />,
      },
    ],
  },
])
function App() {
  return <RouterProvider router={router} />
}

export default App
