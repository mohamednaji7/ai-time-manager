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
      <div className={cn("rounded-full px-4 py-2 mb-4 text-center font-medium shadow-sm", titleColor)}>{title}</div>
      <div className="bg-white rounded-lg p-4 flex-1 flex flex-col gap-3 min-h-[400px] shadow-sm border border-gray-100">
        {children}
        {onAddTask && (
          <Button
            variant="outline"
            className="mt-auto w-full flex items-center justify-center bg-white hover:bg-gray-50"
            onClick={onAddTask}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        )}
      </div>
    </div>
  )
}

