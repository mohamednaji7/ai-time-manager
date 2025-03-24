"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"

interface SprintSidebarProps {
  sprints: Array<{
    id: number
    name: string
    active: boolean
  }>
  onSprintChange: (sprintId: number) => void
}

export function SprintSidebar({ sprints, onSprintChange }: SprintSidebarProps) {
  return (
    <div className="w-full md:w-48 flex-shrink-0 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-sm">
      <h2 className="font-semibold text-sm px-2 py-1 text-gray-500 uppercase">Sprints</h2>
      {sprints.map((sprint) => (
        <Button
          key={sprint.id}
          variant="ghost"
          className={cn(
            "justify-start h-12 text-left transition-all",
            sprint.active ? "bg-black text-white hover:bg-black hover:text-white" : "hover:bg-gray-100 text-gray-700",
          )}
          onClick={() => onSprintChange(sprint.id)}
        >
          {sprint.name}
        </Button>
      ))}
      <div className="flex-1"></div>
      <h2 className="font-semibold text-sm px-2 py-1 text-gray-500 uppercase mt-4">Planning</h2>
      <Button
        variant="ghost"
        className="justify-start h-12 text-left bg-black text-white hover:bg-black hover:text-white"
      >
        <Inbox className="mr-2 h-4 w-4" />
        Backlog
      </Button>
    </div>
  )
}

