"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, ArrowRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { Action, Goal } from "@/lib/supabase"

interface ActionCardProps {
  action: Action
  onStatusChange: (actionId: string, newStatus: "todo" | "in_progress" | "done") => void
  goalTitles?: string[]
  goals: Goal[]
}

export function ActionCard({ action, onStatusChange, goalTitles = [], goals = [] }: ActionCardProps) {
  return (
    <div className="bg-white rounded shadow-sm border border-slate-200 p-3 cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5">
          <CheckSquare className={`h-4 w-4 ${action.priority === "high" ? "text-red-500" : "text-blue-600"}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-slate-600">{action.id}</span>
            {action.priority === "high" && <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />}
          </div>

          <h4 className="text-sm font-medium mb-2 line-clamp-2">{action.title}</h4>

          {action.description && <p className="text-xs text-slate-500 mb-2 line-clamp-2">{action.description}</p>}

          {goals.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {goals.map((goal) => (
                <Badge
                  key={goal.id}
                  variant="outline"
                  className={`text-xs border-0 ${goal.color.replace("bg-", "bg-opacity-20 text-")}`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${goal.color}`}></span>
                  {goal.title}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              {action.assigneeId && (
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-purple-100 text-purple-800">{action.assigneeId}</AvatarFallback>
                </Avatar>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-1">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {action.status !== "todo" && (
                  <DropdownMenuItem onClick={() => onStatusChange(action.id, "todo")}>Move to To Do</DropdownMenuItem>
                )}
                {action.status !== "in_progress" && (
                  <DropdownMenuItem onClick={() => onStatusChange(action.id, "in_progress")}>
                    Move to In Progress
                  </DropdownMenuItem>
                )}
                {action.status !== "done" && (
                  <DropdownMenuItem onClick={() => onStatusChange(action.id, "done")}>Move to Done</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

