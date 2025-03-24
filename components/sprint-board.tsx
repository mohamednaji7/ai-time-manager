"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, Star, Share, Maximize, MoreHorizontal, Plus, Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ActionCard } from "./action-card"
import { NoteCard } from "./note-card"
import type { Action, Note, Sprint, Goal } from "@/lib/supabase"
import { ActionDialog } from "./action-dialog"

export function SprintBoard() {
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [actions, setActions] = useState<Action[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    // Fetch sprints
    fetch("/api/sprints")
      .then((res) => res.json())
      .then((data) => {
        setSprints(data)
        // Set active sprint
        const active = data.find((sprint: Sprint) => sprint.status === "active")
        if (active) {
          setActiveSprint(active)
        } else if (data.length > 0) {
          setActiveSprint(data[0])
        }
      })

    // Fetch goals
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
  }, [])

  useEffect(() => {
    if (activeSprint) {
      // Fetch actions for active sprint
      fetch(`/api/actions?sprintId=${activeSprint.id}`)
        .then((res) => res.json())
        .then((data) => setActions(data))
    }
  }, [activeSprint])

  useEffect(() => {
    // Fetch notes
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
  }, [])

  const handleAddAction = (category: string) => {
    setSelectedCategory(category)
    setIsActionDialogOpen(true)
  }

  const handleActionSubmit = async (actionData: Partial<Action>) => {
    try {
      const response = await fetch("/api/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...actionData,
          sprintId: activeSprint?.id,
          status: "todo",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create action")
      }

      const newAction = await response.json()
      setActions([...actions, newAction])
      setIsActionDialogOpen(false)
    } catch (error) {
      console.error("Error creating action:", error)
    }
  }

  const handleActionStatusChange = async (actionId: string, newStatus: "todo" | "in_progress" | "done") => {
    try {
      const actionToUpdate = actions.find((action) => action.id === actionId)
      if (!actionToUpdate) return

      const updatedAction = { ...actionToUpdate, status: newStatus }

      const response = await fetch("/api/actions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAction),
      })

      if (!response.ok) {
        throw new Error("Failed to update action")
      }

      setActions(actions.map((action) => (action.id === actionId ? { ...action, status: newStatus } : action)))
    } catch (error) {
      console.error("Error updating action:", error)
    }
  }

  const handleAddNote = async () => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "New note",
          color: "bg-yellow-100 text-yellow-800",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create note")
      }

      const newNote = await response.json()
      setNotes([...notes, newNote])
    } catch (error) {
      console.error("Error creating note:", error)
    }
  }

  // Filter actions by category and status
  const category1Actions = actions.filter((action) => action.category === "category1" && action.status !== "done")
  const category2Actions = actions.filter((action) => action.category === "category2" && action.status !== "done")
  const todayActions = actions.filter((action) => action.category === "today" && action.status !== "done")
  const doneActions = actions.filter((action) => action.status === "done")

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
      {/* Board Header */}
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
          <h1 className="text-2xl font-semibold">{activeSprint ? `${activeSprint.name} Board` : "Sprint Board"}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-slate-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>1 day</span>
            </div>

            <Button variant="ghost" size="icon">
              <Star className="h-5 w-5 text-slate-400" />
            </Button>

            <Button variant="ghost" size="icon">
              <Share className="h-5 w-5 text-slate-400" />
            </Button>

            <Button variant="ghost" size="icon">
              <Maximize className="h-5 w-5 text-slate-400" />
            </Button>

            <Button variant="outline" size="sm" className="ml-2">
              Start stand-up
            </Button>

            <Button variant="outline" size="sm" className="ml-2">
              Complete sprint
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit sprint</DropdownMenuItem>
                <DropdownMenuItem>Manage issues</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete sprint</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Board Toolbar */}
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
          <span className="text-xs text-slate-500">GROUP BY</span>
          <Button variant="outline" size="sm">
            None
          </Button>

          <Button variant="ghost" size="sm" className="text-blue-600">
            Import work
          </Button>

          <Button variant="ghost" size="sm" className="text-slate-600">
            View settings
          </Button>
        </div>
      </div>

      {/* Board Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex gap-4 h-full">
          {/* Category 1 Column */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm text-slate-700">Category 1 ({category1Actions.length})</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleAddAction("category1")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 bg-slate-50 rounded-md p-2 space-y-2 overflow-y-auto">
              {category1Actions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onStatusChange={handleActionStatusChange}
                  goalTitles={getGoalTitles(action.goalIds)}
                  goals={goals.filter((goal) => action.goalIds.includes(goal.id))}
                />
              ))}

              {category1Actions.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <Button
                    variant="ghost"
                    className="text-slate-500 border border-dashed border-slate-300 h-20 w-full"
                    onClick={() => handleAddAction("category1")}
                  >
                    + Add action
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Category 2 Column */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm text-slate-700">Category 2 ({category2Actions.length})</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleAddAction("category2")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 bg-slate-50 rounded-md p-2 space-y-2 overflow-y-auto">
              {category2Actions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onStatusChange={handleActionStatusChange}
                  goalTitles={getGoalTitles(action.goalIds)}
                  goals={goals.filter((goal) => action.goalIds.includes(goal.id))}
                />
              ))}

              {category2Actions.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <Button
                    variant="ghost"
                    className="text-slate-500 border border-dashed border-slate-300 h-20 w-full"
                    onClick={() => handleAddAction("category2")}
                  >
                    + Add action
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Today Actions Column */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm text-slate-700">Today Actions ({todayActions.length})</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleAddAction("today")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 bg-slate-50 rounded-md p-2 space-y-2 overflow-y-auto">
              {todayActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onStatusChange={handleActionStatusChange}
                  goalTitles={getGoalTitles(action.goalIds)}
                  goals={goals.filter((goal) => action.goalIds.includes(goal.id))}
                />
              ))}

              {todayActions.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <Button
                    variant="ghost"
                    className="text-slate-500 border border-dashed border-slate-300 h-20 w-full"
                    onClick={() => handleAddAction("today")}
                  >
                    + Add action
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Notes Column */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm text-slate-700">Notes ({notes.length})</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleAddNote}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 bg-slate-50 rounded-md p-2 space-y-2 overflow-y-auto">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}

              {notes.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <Button
                    variant="ghost"
                    className="text-slate-500 border border-dashed border-slate-300 h-20 w-full"
                    onClick={handleAddNote}
                  >
                    + Add note
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm text-slate-700 flex items-center">
                Done ({doneActions.length}) <Check className="h-4 w-4 ml-1 text-green-500" />
              </h3>
            </div>

            <div className="flex-1 bg-slate-50 rounded-md p-2 space-y-2 overflow-y-auto">
              {doneActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onStatusChange={handleActionStatusChange}
                  goalTitles={getGoalTitles(action.goalIds)}
                  goals={goals.filter((goal) => action.goalIds.includes(goal.id))}
                />
              ))}

              {doneActions.length === 0 && (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  <p>Completed actions will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Dialog */}
      <ActionDialog
        open={isActionDialogOpen}
        onOpenChange={setIsActionDialogOpen}
        onSubmit={handleActionSubmit}
        defaultCategory={selectedCategory}
        goals={goals}
      />
    </div>
  )
}

