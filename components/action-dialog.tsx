"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Goal } from "@/lib/supabase"

interface ActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  defaultCategory: string | null
  goals: Goal[]
}

export function ActionDialog({ open, onOpenChange, onSubmit, defaultCategory, goals }: ActionDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState(defaultCategory || "category1")
  const [priority, setPriority] = useState("medium")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  useEffect(() => {
    if (open) {
      // Reset form when dialog opens
      setTitle("")
      setDescription("")
      setCategory(defaultCategory || "category1")
      setPriority("medium")
      setSelectedGoals([])
    }
  }, [open, defaultCategory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      title,
      description,
      category,
      priority,
      goalIds: selectedGoals,
      status: "todo",
    })
  }

  const handleGoalToggle = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId))
    } else {
      setSelectedGoals([...selectedGoals, goalId])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Action</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter action title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter action description"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  <SelectItem value="today">Today Actions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Goals</Label>
            <div className="border rounded-md p-2 max-h-[150px] overflow-y-auto">
              {goals.length > 0 ? (
                goals.map((goal) => (
                  <div key={goal.id} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      id={`goal-${goal.id}`}
                      checked={selectedGoals.includes(goal.id)}
                      onChange={() => handleGoalToggle(goal.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`goal-${goal.id}`} className="text-sm flex items-center">
                      <div className={`w-2 h-2 rounded-full ${goal.color} mr-2`}></div>
                      {goal.title}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 py-2">No goals available</p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Action</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

