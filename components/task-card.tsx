import { cn } from "@/lib/utils"

interface TaskCardProps {
  title: string
  color?: string
}

export function TaskCard({ title, color = "bg-blue-400" }: TaskCardProps) {
  return <div className={cn("p-2 rounded-md text-center", color)}>{title}</div>
}

