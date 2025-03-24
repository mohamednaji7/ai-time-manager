import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

export type Action = {
  id: string
  title: string
  description?: string
  status: "todo" | "in_progress" | "done"
  priority: "low" | "medium" | "high"
  category: "category1" | "category2" | "today"
  sprintId: string | null
  goalIds: string[]
  createdAt: string
  updatedAt: string
  assigneeId?: string
}

export type Note = {
  id: string
  content: string
  color?: string
  createdAt: string
  updatedAt: string
}

export type Sprint = {
  id: string
  name: string
  startDate: string | null
  endDate: string | null
  status: "planning" | "active" | "completed"
  goal?: string
}

export type Goal = {
  id: string
  title: string
  description: string
  status: "not_started" | "in_progress" | "completed"
  dueDate?: string
  progress: number
  color: string
  createdAt: string
  updatedAt: string
}

export type User = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

