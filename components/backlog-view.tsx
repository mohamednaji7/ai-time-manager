"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Calendar, Share, Maximize, MoreHorizontal, Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Action, Sprint, Goal } from "@/lib/supabase"
import { ActionDialog } from "./action-dialog"

export function BacklogView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [backlogActions, setBacklogActions] = useState<Action[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch sprints
    fetch("/api/sprints")
      .then((res) => res.json())
      .then((data) => setSprints(data))

    // Fetch backlog actions
    fetch("/api/actions?sprintId=backlog")
      .then((res) => res.json())
      .then((data) => setBacklogActions(data))

    // Fetch goals
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
  }, [])

  const handleActionSubmit = async (actionData: Partial<Action>) => {
    try {
      const response = await fetch("/api/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...actionData,
          sprintId: null, // Backlog actions have no sprint
          status: "todo",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create action")
      }

      const newAction = await response.json()
      setBacklogActions([...backlogActions, newAction])
      setIsActionDialogOpen(false)
    } catch (error) {
      console.error("Error creating action:", error)
    }
  }

  // Get goal titles for an action
  const getGoalTitles = (goalIds: string[]) => {
    return goalIds
      .map((id) => {
        const goal = goals.find((g) => g.id === id)
        return goal ? goal.title : ""
      })
      .filter(Boolean)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Backlog Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          <span>/</span>
          <Link href="/" className="hover:underline">
            Agile Sprint Master
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Backlog</h1>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share className="h-5 w-5 text-slate-400" />
            </Button>

            <Button variant="ghost" size="icon">
              <Maximize className="h-5 w-5 text-slate-400" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Configure backlog</DropdownMenuItem>
                <DropdownMenuItem>Print backlog</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Export issues</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Backlog Toolbar */}
      <div className="px-6 py-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search"
            className="w-64 h-8 bg-slate-100 border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button variant="ghost" size="sm" className="text-slate-600">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span>Assignee</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-blue-600">
            Import work
          </Button>

          <Button variant="ghost" size="sm" className="text-slate-600">
            View settings
          </Button>
        </div>
      </div>

      {/* Backlog Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-4">
          {/* Sprints */}
          {sprints.map((sprint) => (
            <div key={sprint.id} className="border border-slate-200 rounded-md">
              <div className="flex items-center p-3 bg-slate-50 border-b">
                <Checkbox id={`sprint-${sprint.id}`} className="mr-2" />
                <div className="flex items-center">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  <h3 className="font-medium">{sprint.name}</h3>
                  {sprint.startDate && sprint.endDate ? (
                    <span className="text-xs text-slate-500 ml-2">
                      {sprint.startDate} - {sprint.endDate}
                    </span>
                  ) : (
                    <Button variant="ghost" size="sm" className="ml-2 h-6 text-blue-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      Add dates
                    </Button>
                  )}
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">0</Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">0</Badge>
                  <Button variant="outline" size="sm">
                    {sprint.status === "active" ? "Complete sprint" : "Start sprint"}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-2 space-y-2">{/* Sprint actions would go here */}</div>

              <div className="p-3 border-t">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <Plus className="h-4 w-4 mr-1" />
                  Create action
                </Button>
              </div>
            </div>
          ))}

          {/* Backlog Section */}
          <div className="border border-slate-200 rounded-md">
            <div className="flex items-center p-3 bg-slate-50 border-b">
              <Checkbox id="backlog" className="mr-2" />
              <div className="flex items-center">
                <ChevronDown className="h-4 w-4 mr-2" />
                <h3 className="font-medium">Backlog</h3>
                <Badge className="ml-2 bg-slate-200 text-slate-700 hover:bg-slate-300">
                  ({backlogActions.length} actions)
                </Badge>
              </div>

              <div className="ml-auto">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-2 space-y-2">
              {backlogActions.length > 0 ? (
                backlogActions.map((action) => (
                  <div key={action.id} className="flex items-center p-2 hover:bg-slate-50 rounded">
                    <Checkbox id={`action-${action.id}`} className="mr-2" />
                    <div className="flex items-center gap-2 flex-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {action.id}
                      </Badge>
                      <span className="truncate">{action.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {action.goalIds.length > 0 && (
                        <div className="flex gap-1">
                          {action.goalIds.slice(0, 2).map((goalId) => {
                            const goal = goals.find((g) => g.id === goalId)
                            if (!goal) return null
                            return (
                              <Badge key={goalId} className={`${goal.color.replace("bg-", "bg-opacity-20 text-")}`}>
                                {goal.title}
                              </Badge>
                            )
                          })}
                          {action.goalIds.length > 2 && (
                            <Badge className="bg-slate-100 text-slate-700">+{action.goalIds.length - 2}</Badge>
                          )}
                        </div>
                      )}
                      <Badge className="bg-slate-100 text-slate-700">TO DO</Badge>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-500">
                  <p>Your backlog is empty. Create an action to get started.</p>
                </div>
              )}
            </div>

            <div className="p-3 border-t">
              <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setIsActionDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Create action
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Dialog */}
      <ActionDialog
        open={isActionDialogOpen}
        onOpenChange={setIsActionDialogOpen}
        onSubmit={handleActionSubmit}
        defaultCategory="category1"
        goals={goals}
      />
    </div>
  )
}

