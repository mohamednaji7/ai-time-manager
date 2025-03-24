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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface GoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  goal: Goal | null
}

export function GoalDialog({ open, onOpenChange, onSubmit, goal }: GoalDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("not_started")
  const [dueDate, setDueDate] = useState("")
  const [color, setColor] = useState("bg-blue-500")

  useEffect(() => {
    if (open) {
      if (goal) {
        // Edit mode - populate form with goal data
        setTitle(goal.title)
        setDescription(goal.description)
        setStatus(goal.status)
        setDueDate(goal.dueDate || "")
        setColor(goal.color)
      } else {
        // Create mode - reset form
        setTitle("")
        setDescription("")
        setStatus("not_started")
        setDueDate("")
        setColor("bg-blue-500")
      }
    }
  }, [open, goal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      title,
      description,
      status,
      dueDate: dueDate || undefined,
      color,
      ...(goal ? { id: goal.id, progress: goal.progress } : {}),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{goal ? "Edit Goal" : "Create New Goal"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter goal title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter goal description"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date (Optional)</Label>
            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <RadioGroup value={color} onValueChange={setColor} className="flex gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bg-blue-500" id="blue" className="bg-blue-500 border-blue-500" />
                <Label htmlFor="blue" className="sr-only">
                  Blue
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bg-green-500" id="green" className="bg-green-500 border-green-500" />
                <Label htmlFor="green" className="sr-only">
                  Green
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bg-purple-500" id="purple" className="bg-purple-500 border-purple-500" />
                <Label htmlFor="purple" className="sr-only">
                  Purple
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bg-yellow-500" id="yellow" className="bg-yellow-500 border-yellow-500" />
                <Label htmlFor="yellow" className="sr-only">
                  Yellow
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bg-red-500" id="red" className="bg-red-500 border-red-500" />
                <Label htmlFor="red" className="sr-only">
                  Red
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{goal ? "Update Goal" : "Create Goal"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

