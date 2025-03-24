import { NextResponse } from "next/server"
import type { Sprint } from "@/lib/supabase"

// Dummy data for sprints
const dummySprints: Sprint[] = [
  {
    id: "1",
    name: "Sprint 1",
    startDate: "2023-03-15",
    endDate: "2023-03-29",
    status: "active",
    goal: "Complete core functionality",
  },
  {
    id: "2",
    name: "Sprint 2",
    startDate: "2023-03-30",
    endDate: "2023-04-13",
    status: "planning",
    goal: "Implement user feedback",
  },
  {
    id: "3",
    name: "Sprint 3",
    startDate: null,
    endDate: null,
    status: "planning",
    goal: "Performance optimization",
  },
]

export async function GET() {
  return NextResponse.json(dummySprints)
}

export async function POST(request: Request) {
  const sprint = await request.json()

  // In a real implementation, we would save to Supabase here
  const newSprint: Sprint = {
    id: (dummySprints.length + 1).toString(),
    ...sprint,
  }

  return NextResponse.json(newSprint)
}

export async function PUT(request: Request) {
  const sprint = await request.json()

  // In a real implementation, we would update in Supabase here
  return NextResponse.json(sprint)
}

