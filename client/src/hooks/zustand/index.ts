import { create } from "zustand"

interface WorkspaceState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
interface ProjectsState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
interface TasksState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
export const useWorkspaceState = create<WorkspaceState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
export const useProjectsState = create<ProjectsState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
export const useTasksState = create<TasksState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
