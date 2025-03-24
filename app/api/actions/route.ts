import { NextResponse } from "next/server"
import type { Action } from "@/lib/supabase"

// Dummy data for actions
const dummyActions: Action[] = [
  {
    id: "1",
    title: "Implement user authentication",
    description: "Add login and registration functionality",
    status: "todo",
    priority: "high",
    category: "category1",
    sprintId: "1",
    goalIds: ["1"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "1",
  },
  {
    id: "2",
    title: "Design database schema",
    description: "Create tables and relationships",
    status: "in_progress",
    priority: "high",
    category: "category1",
    sprintId: "1",
    goalIds: ["1", "2"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "2",
  },
  {
    id: "3",
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for automated deployment",
    status: "todo",
    priority: "medium",
    category: "category2",
    sprintId: "1",
    goalIds: ["3"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "1",
  },
  {
    id: "4",
    title: "Write API documentation",
    description: "Document all endpoints using Swagger",
    status: "todo",
    priority: "low",
    category: "category2",
    sprintId: "1",
    goalIds: ["2"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "3",
  },
  {
    id: "5",
    title: "Fix login page bug",
    description: "Address issue with form validation",
    status: "todo",
    priority: "high",
    category: "today",
    sprintId: "1",
    goalIds: ["1"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "1",
  },
  {
    id: "6",
    title: "Review pull requests",
    description: "Check code quality and approve changes",
    status: "todo",
    priority: "medium",
    category: "today",
    sprintId: "1",
    goalIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "2",
  },
  {
    id: "7",
    title: "Optimize database queries",
    description: "Improve performance of slow queries",
    status: "done",
    priority: "high",
    category: "category1",
    sprintId: "1",
    goalIds: ["2"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "3",
  },
  {
    id: "8",
    title: "Create user dashboard",
    description: "Design and implement user dashboard",
    status: "todo",
    priority: "medium",
    category: "category1",
    sprintId: null,
    goalIds: ["1"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "1",
  },
  {
    id: "9",
    title: "Implement file upload",
    description: "Add functionality to upload and store files",
    status: "todo",
    priority: "medium",
    category: "category2",
    sprintId: null,
    goalIds: ["3"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "2",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sprintId = searchParams.get("sprintId")
  const category = searchParams.get("category")
  const status = searchParams.get("status")
  const goalId = searchParams.get("goalId")

  let filteredActions = [...dummyActions]

  if (sprintId) {
    if (sprintId === "backlog") {
      filteredActions = filteredActions.filter((action) => action.sprintId === null)
    } else {
      filteredActions = filteredActions.filter((action) => action.sprintId === sprintId)
    }
  }

  if (category) {
    filteredActions = filteredActions.filter((action) => action.category === category)
  }

  if (status) {
    filteredActions = filteredActions.filter((action) => action.status === status)
  }

  if (goalId) {
    filteredActions = filteredActions.filter((action) => action.goalIds.includes(goalId))
  }

  return NextResponse.json(filteredActions)
}

export async function POST(request: Request) {
  const action = await request.json()

  // In a real implementation, we would save to Supabase here
  const newAction: Action = {
    id: (dummyActions.length + 1).toString(),
    ...action,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json(newAction)
}

export async function PUT(request: Request) {
  const action = await request.json()

  // In a real implementation, we would update in Supabase here
  return NextResponse.json(action)
}

