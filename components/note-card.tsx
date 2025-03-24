import { cn } from "@/lib/utils"

interface NoteCardProps {
  content: string
  color?: string
}

export function NoteCard({ content, color = "bg-green-400" }: NoteCardProps) {
  return <div className={cn("p-2 rounded-md text-center", color)}>{content}</div>
}

