"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Target, Bell, Plus, ChevronDown, MoreHorizontal, Check, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Goal, Action } from "@/lib/supabase"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GoalDialog } from "./goal-dialog"

export function GoalsView() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [actions, setActions] = useState<Action[]>([])
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [expandedGoals, setExpandedGoals] = useState<string[]>([])

  useEffect(() => {
    // Fetch goals
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => {
        setGoals(data)
        // Expand the first goal by default
        if (data.length > 0) {
          setExpandedGoals([data[0].id])
        }
      })

    // Fetch all actions
    fetch("/api/actions")
      .then((res) => res.json())
      .then((data) => setActions(data))
  }, [])

  const handleGoalSubmit = async (goalData: Partial<Goal>) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...goalData,
          progress: 0,
          status: "not_started",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create goal")
      }

      const newGoal = await response.json()
      setGoals([...goals, newGoal])
      setIsGoalDialogOpen(false)
    } catch (error) {
      console.error("Error creating goal:", error)
    }
  }

  const toggleGoalExpansion = (goalId: string) => {
    if (expandedGoals.includes(goalId)) {
      setExpandedGoals(expandedGoals.filter((id) => id !== goalId))
    } else {
      setExpandedGoals([...expandedGoals, goalId])
    }
  }

  const getActionsForGoal = (goalId: string) => {
    return actions.filter((action) => action.goalIds.includes(goalId))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "not_started":
        return <Clock className="h-4 w-4 text-slate-500" />
      case "in_progress":
        return <Target className="h-4 w-4 text-blue-500" />
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Goals Header */}
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
          <h1 className="text-2xl font-semibold">Goals</h1>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setSelectedGoal(null)
                setIsGoalDialogOpen(true)
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Goal
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-600">
              Source
            </Button>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-slate-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Goals Content */}
      <div className="flex-1 p-6 overflow-auto">
        {goals.length > 0 ? (
          <div className="space-y-4">
            {goals.map((goal) => {
              const goalActions = getActionsForGoal(goal.id)
              const isExpanded = expandedGoals.includes(goal.id)

              return (
                <div key={goal.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div
                    className="flex items-center p-4 bg-white cursor-pointer hover:bg-slate-50"
                    onClick={() => toggleGoalExpansion(goal.id)}
                  >
                    <div className={`w-1 self-stretch ${goal.color} mr-4`}></div>

                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        {getStatusIcon(goal.status)}
                        <h3 className="font-medium text-lg ml-2">{goal.title}</h3>
                      </div>

                      <div className="flex items-center text-sm text-slate-600">
                        <span>{goalActions.length} linked actions</span>
                        {goal.dueDate && <span className="ml-4">Due: {goal.dueDate}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedGoal(goal)
                              setIsGoalDialogOpen(true)
                            }}
                          >
                            Edit goal
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Link actions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Delete goal</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 bg-slate-50 border-t">
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-slate-600">{goal.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Linked Actions</h4>
                        {goalActions.length > 0 ? (
                          <div className="space-y-2">
                            {goalActions.map((action) => (
                              <div key={action.id} className="bg-white p-3 rounded border flex items-center">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-slate-500">{action.id}</span>
                                    <span
                                      className={`text-xs px-1.5 py-0.5 rounded ${
                                        action.status === "done"
                                          ? "bg-green-100 text-green-800"
                                          : action.status === "in_progress"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-slate-100 text-slate-800"
                                      }`}
                                    >
                                      {action.status.replace("_", " ").toUpperCase()}
                                    </span>
                                  </div>
                                  <div className="font-medium">{action.title}</div>
                                </div>

                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-white p-4 rounded border text-center text-slate-500">
                            <p>No actions linked to this goal yet.</p>
                            <Button variant="ghost" size="sm" className="mt-2">
                              <Plus className="h-4 w-4 mr-1" />
                              Link actions
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block text-4xl mb-4">🎯</span>
              <h2 className="text-2xl font-semibold mb-2">No goals created yet</h2>
              <p className="text-slate-600 mb-6">
                Create goals to track progress on important initiatives and link them to your actions.
              </p>

              <Button
                variant="primary"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setIsGoalDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Create your first goal
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Goal Dialog */}
      <GoalDialog
        open={isGoalDialogOpen}
        onOpenChange={setIsGoalDialogOpen}
        onSubmit={handleGoalSubmit}
        goal={selectedGoal}
      />
    </div>
  )
}

