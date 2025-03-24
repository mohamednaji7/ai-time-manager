"use client"

import { useState } from "react"
import { SprintSidebar } from "./sprint-sidebar"
import { TaskColumn } from "./task-column"
import { TaskCard } from "./task-card"
import { NoteCard } from "./note-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"

// Initial data structure
const initialSprints = [
  { id: 1, name: "Sprint 1", active: true },
  { id: 2, name: "Sprint 2", active: false },
  { id: 3, name: "Sprint 3", active: false },
]

const initialCategories = [
  { id: 1, name: "Category 1", color: "bg-red-400" },
  { id: 2, name: "Category 1", color: "bg-blue-400" },
  { id: 3, name: "Today Actions", color: "bg-gray-200" },
  { id: 4, name: "Notes", color: "bg-gray-200" },
]

const initialTasks = [
  { id: 1, title: "Action 1", categoryId: 1, color: "bg-red-400" },
  { id: 2, title: "Action", categoryId: 1, color: "bg-red-400" },
  { id: 3, title: "Action", categoryId: 2, color: "bg-blue-400" },
  { id: 4, title: "Action", categoryId: 2, color: "bg-blue-400" },
  { id: 5, title: "Action", categoryId: 2, color: "bg-blue-400" },
  { id: 6, title: "Action", categoryId: 3, color: "bg-red-400" },
  { id: 7, title: "Action", categoryId: 3, color: "bg-blue-400" },
]

const initialNotes = [
  { id: 1, content: "Note", categoryId: 4, color: "bg-green-400" },
  { id: 2, content: "Note", categoryId: 4, color: "bg-green-400" },
  { id: 3, content: "Note", categoryId: 4, color: "bg-green-400" },
]

export function SprintBoard() {
  const [sprints, setSprints] = useState(initialSprints)
  const [categories] = useState(initialCategories)
  const [tasks, setTasks] = useState(initialTasks)
  const [notes, setNotes] = useState(initialNotes)
  const [showAllNotes, setShowAllNotes] = useState(false)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleSprintChange = (sprintId: number) => {
    setSprints(
      sprints.map((sprint) => ({
        ...sprint,
        active: sprint.id === sprintId,
      })),
    )
  }

  const handleAddTask = (task: any) => {
    const newTask = {
      id: tasks.length + 1,
      title: task.title,
      categoryId: task.categoryId,
      color: task.categoryId === 1 ? "bg-red-400" : "bg-blue-400",
    }
    setTasks([...tasks, newTask])
    setIsAddingTask(false)
  }

  const activeSprint = sprints.find((sprint) => sprint.active)

  const openAddTaskDialog = (categoryId: number) => {
    setSelectedCategory(categoryId)
    setIsAddingTask(true)
  }

  const displayedNotes = showAllNotes ? notes : notes.slice(0, 3)

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] overflow-hidden">
      <SprintSidebar sprints={sprints} onSprintChange={handleSprintChange} />

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {categories.slice(0, 2).map((category) => (
            <TaskColumn
              key={category.id}
              title={category.name}
              titleColor={category.color}
              onAddTask={() => openAddTaskDialog(category.id)}
            >
              {tasks
                .filter((task) => task.categoryId === category.id)
                .map((task) => (
                  <TaskCard key={task.id} title={task.title} color={task.color} />
                ))}
            </TaskColumn>
          ))}

          <TaskColumn title={categories[2].name} titleColor="bg-gray-200" onAddTask={() => openAddTaskDialog(3)}>
            {tasks
              .filter((task) => task.categoryId === 3)
              .map((task) => (
                <TaskCard key={task.id} title={task.title} color={task.color} />
              ))}
          </TaskColumn>

          <TaskColumn title={categories[3].name} titleColor="bg-gray-200">
            {displayedNotes.map((note) => (
              <NoteCard key={note.id} content={note.content} color={note.color} />
            ))}

            {notes.length > 3 && (
              <Button variant="secondary" className="w-full mt-2" onClick={() => setShowAllNotes(!showAllNotes)}>
                {showAllNotes ? "Show Less" : "Expand other to see other notes"}
              </Button>
            )}
          </TaskColumn>
        </div>
      </div>

      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <TaskForm onSubmit={handleAddTask} categoryId={selectedCategory} categories={categories.slice(0, 3)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

