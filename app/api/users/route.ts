import { NextResponse } from "next/server"
import type { User } from "@/lib/supabase"

// Dummy data for users
const dummyUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

export async function GET() {
  return NextResponse.json(dummyUsers)
}

