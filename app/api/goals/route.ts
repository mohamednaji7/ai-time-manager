import { NextResponse } from "next/server"
import type { Goal } from "@/lib/supabase"

// Dummy data for goals
const dummyGoals: Goal[] = [
  {
    id: "1",
    title: "Improve User Experience",
    description: "Enhance the overall user experience by implementing intuitive UI/UX design principles",
    status: "in_progress",
    dueDate: "2023-06-30",
    progress: 45,
    color: "bg-blue-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Optimize Performance",
    description: "Improve application performance by optimizing database queries and frontend rendering",
    status: "in_progress",
    dueDate: "2023-07-15",
    progress: 30,
    color: "bg-green-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Enhance Security",
    description: "Strengthen application security by implementing best practices and addressing vulnerabilities",
    status: "not_started",
    dueDate: "2023-08-01",
    progress: 0,
    color: "bg-purple-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Increase Test Coverage",
    description: "Expand test coverage to ensure application reliability and stability",
    status: "not_started",
    dueDate: "2023-07-30",
    progress: 10,
    color: "bg-yellow-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(dummyGoals)
}

export async function POST(request: Request) {
  const goal = await request.json()

  // In a real implementation, we would save to Supabase here
  const newGoal: Goal = {
    id: (dummyGoals.length + 1).toString(),
    ...goal,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json(newGoal)
}

export async function PUT(request: Request) {
  const goal = await request.json()

  // In a real implementation, we would update in Supabase here
  return NextResponse.json(goal)
}

