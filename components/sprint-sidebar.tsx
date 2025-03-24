"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
    <div className="w-full md:w-48 flex-shrink-0 flex flex-col gap-2">
      {sprints.map((sprint) => (
        <Button
          key={sprint.id}
          variant="outline"
          className={cn(
            "justify-start h-12 text-left",
            sprint.active && "bg-black text-white hover:bg-black hover:text-white",
          )}
          onClick={() => onSprintChange(sprint.id)}
        >
          {sprint.name}
        </Button>
      ))}
      <div className="flex-1"></div>
      <Button
        variant="outline"
        className="justify-start h-12 text-left bg-black text-white hover:bg-black hover:text-white mt-auto"
      >
        Backlog
      </Button>
    </div>
  )
}

