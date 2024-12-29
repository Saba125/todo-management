import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { QueryProvider } from "./providers/query-provider.tsx"
import { Toaster } from "react-hot-toast"
import WorkspaceForm from "./components/create-workspace-form.tsx"
import ProjectForm from "./components/create-project-form.tsx"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Toaster />
      <WorkspaceForm />
      <App />
    </QueryProvider>
  </StrictMode>
)
