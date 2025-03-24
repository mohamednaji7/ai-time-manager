"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskColumnProps {
  title: string
  titleColor?: string
  children: React.ReactNode
  onAddTask?: () => void
}

export function TaskColumn({ title, titleColor = "bg-gray-200", children, onAddTask }: TaskColumnProps) {
  return (
    <div className="flex flex-col w-64 flex-shrink-0">
      <div className={cn("rounded-full px-4 py-2 mb-4 text-center font-medium", titleColor)}>{title}</div>
      <div className="bg-gray-200 rounded-md p-4 flex-1 flex flex-col gap-2 min-h-[400px]">
        {children}
        {onAddTask && (
          <Button variant="ghost" className="mt-auto w-full flex items-center justify-center" onClick={onAddTask}>
            <PlusCircle className="h-5 w-5 mr-1" />
            Add Task
          </Button>
        )}
      </div>
    </div>
  )
}

