"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Share, Maximize, MoreHorizontal, Plus, Filter, Group, ListFilter } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import type { Action, Sprint } from "@/lib/supabase"

export function ListView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actions, setActions] = useState<Action[]>([])
  const [sprints, setSprints] = useState<Sprint[]>([])

  useEffect(() => {
    // Fetch all actions
    fetch("/api/actions")
      .then((res) => res.json())
      .then((data) => setActions(data))

    // Fetch sprints
    fetch("/api/sprints")
      .then((res) => res.json())
      .then((data) => setSprints(data))
  }, [])

  const getSprintName = (sprintId: string | null) => {
    if (!sprintId) return ""
    const sprint = sprints.find((s) => s.id === sprintId)
    return sprint ? sprint.name : ""
  }

  return (
    <div className="h-full flex flex-col">
      {/* List Header */}
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
          <h1 className="text-2xl font-semibold">List</h1>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-slate-600">
              Give feedback
            </Button>

            <Button variant="ghost" size="icon">
              <Share className="h-5 w-5 text-slate-400" />
            </Button>

            <Button variant="ghost" size="icon">
              <Maximize className="h-5 w-5 text-slate-400" />
            </Button>

            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* List Toolbar */}
      <div className="px-6 py-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search list"
            className="w-64 h-8 bg-slate-100 border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-600">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>

          <Button variant="ghost" size="sm" className="text-slate-600">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>

          <Button variant="ghost" size="sm" className="text-slate-600">
            <Group className="h-4 w-4 mr-1" />
            Group
          </Button>

          <Button variant="ghost" size="sm" className="text-slate-600">
            <ListFilter className="h-4 w-4 mr-1" />
            Format
          </Button>

          <Button variant="ghost" size="sm" className="text-slate-600">
            More
          </Button>
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="w-8 p-2">
                <Checkbox />
              </th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Type</th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Key</th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Summary</th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Status</th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Comments</th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Sprint</th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Assignee</th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Due date</th>
              <th className="p-2 text-left font-medium text-sm text-slate-600">Labels</th>
            </tr>
          </thead>
          <tbody>
            {actions.length > 0 ? (
              actions.map((action) => (
                <tr key={action.id} className="border-b hover:bg-slate-50">
                  <td className="p-2">
                    <Checkbox />
                  </td>
                  <td className="p-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Action
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {action.id}
                    </Badge>
                  </td>
                  <td className="p-2">{action.title}</td>
                  <td className="p-2">
                    <Badge
                      className={`
                      ${
                        action.status === "todo"
                          ? "bg-slate-100 text-slate-700"
                          : action.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }
                    `}
                    >
                      {action.status.toUpperCase().replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Button variant="ghost" size="sm" className="text-slate-500">
                      Add comment
                    </Button>
                  </td>
                  <td className="p-2">{getSprintName(action.sprintId)}</td>
                  <td className="p-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="p-2"></td>
                  <td className="p-2">
                    {action.labels && action.labels.length > 0 && (
                      <Badge className="bg-slate-100 text-slate-700">{action.labels[0]}</Badge>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="p-8 text-center text-slate-500">
                  <p>No actions found. Create an action to get started.</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => (window.location.href = "/")}>
                    <Plus className="h-4 w-4 mr-1" />
                    Create action
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

