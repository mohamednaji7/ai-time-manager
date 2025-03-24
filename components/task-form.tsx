"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskFormProps {
  onSubmit: (task: { title: string; categoryId: number }) => void
  categoryId: number | null
  categories: Array<{ id: number; name: string }>
}

export function TaskForm({ onSubmit, categoryId, categories }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId ? categoryId.toString() : "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && selectedCategory) {
      onSubmit({
        title,
        categoryId: Number.parseInt(selectedCategory),
      })
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Add Task
      </Button>
    </form>
  )
}

