import { NextResponse } from "next/server"
import type { Note } from "@/lib/supabase"

// Dummy data for notes
const dummyNotes: Note[] = [
  {
    id: "1",
    content: "Remember to update the team on progress during the daily standup",
    color: "bg-blue-100 text-blue-800",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    content: "The client meeting is scheduled for Thursday at 2 PM",
    color: "bg-green-100 text-green-800",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    content: "Need to prepare demo for the next sprint review",
    color: "bg-purple-100 text-purple-800",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    content: "Don't forget to update documentation after implementing new features",
    color: "bg-yellow-100 text-yellow-800",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(dummyNotes)
}

export async function POST(request: Request) {
  const note = await request.json()

  // In a real implementation, we would save to Supabase here
  const newNote: Note = {
    id: (dummyNotes.length + 1).toString(),
    ...note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json(newNote)
}

export async function PUT(request: Request) {
  const note = await request.json()

  // In a real implementation, we would update in Supabase here
  return NextResponse.json(note)
}

