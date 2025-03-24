"use client"

import { cn } from "@/lib/utils"
import type { Note } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(note.content)

  const handleSave = async () => {
    try {
      await fetch("/api/notes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...note,
          content,
        }),
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Error updating note:", error)
    }
  }

  return (
    <div
      className={cn(
        "p-3 rounded-md text-left shadow-sm transition-all hover:shadow-md relative group",
        note.color || "bg-yellow-100 text-yellow-800",
      )}
    >
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] text-sm bg-white/80 border-none focus-visible:ring-white"
          />
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs bg-white/30"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button size="sm" className="h-7 px-2 text-xs bg-white/30" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="whitespace-pre-wrap text-sm">{note.content}</div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-white/30"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-3 w-3" />
          </Button>
        </>
      )}
    </div>
  )
}

