"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, HelpCircle, Settings, ChevronDown, LayoutGrid, ListTodo, List, Target } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface JiraLayoutProps {
  children: React.ReactNode
}

export function JiraLayout({ children }: JiraLayoutProps) {
  const pathname = usePathname()
  const [projectName] = useState("Agile Sprint Master")

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation */}
      <header className="h-14 border-b flex items-center px-4 bg-white">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-slate-500">
            <LayoutGrid className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center gap-1">
            <svg viewBox="0 0 32 32" className="h-7 w-7 text-blue-500 fill-current">
              <path
                d="M15.9669 0L29.8014 4.20297V25.2178L15.9669 32L2.13242 25.2178V4.20297L15.9669 0Z"
                fill="#2684FF"
              />
              <path
                d="M15.9669 0V7.8919C15.9669 7.8919 16.0619 15.8891 15.9669 15.8891C15.8719 15.8891 8.7879 11.6861 8.7879 11.6861L2.13242 4.20297L15.9669 0Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M15.9669 15.8891V32L2.13242 25.2178V4.20297L8.7879 11.6861C8.7879 11.6861 15.8719 15.8891 15.9669 15.8891Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M8.7879 11.6861L15.9669 7.8919V0L2.13242 4.20297L8.7879 11.6861Z"
                fill="white"
                fillOpacity="0.5"
              />
            </svg>
            <span className="font-medium">Jira</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              className="text-slate-600 h-14 rounded-none border-b-2 border-transparent hover:border-slate-300 hover:bg-transparent"
            >
              Your work <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              className="text-slate-600 h-14 rounded-none border-b-2 border-transparent hover:border-slate-300 hover:bg-transparent"
            >
              Projects <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              className="text-slate-600 h-14 rounded-none border-b-2 border-transparent hover:border-slate-300 hover:bg-transparent"
            >
              Filters <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              className="text-slate-600 h-14 rounded-none border-b-2 border-transparent hover:border-slate-300 hover:bg-transparent"
            >
              Dashboards <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              className="text-slate-600 h-14 rounded-none border-b-2 border-transparent hover:border-slate-300 hover:bg-transparent"
            >
              Teams <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              className="text-slate-600 h-14 rounded-none border-b-2 border-transparent hover:border-slate-300 hover:bg-transparent"
            >
              Apps <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Create
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Input
              placeholder="Search"
              className="w-64 h-8 bg-slate-100 border-slate-200 focus-visible:ring-blue-500"
              startIcon={<Search className="h-4 w-4 text-slate-500" />}
            />

            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-slate-500">
              <HelpCircle className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-slate-500">
              <Settings className="h-5 w-5" />
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-slate-50 flex flex-col overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded bg-red-500 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <h2 className="font-medium text-sm">{projectName}</h2>
                <p className="text-xs text-slate-500">Software project</p>
              </div>
            </div>
          </div>

          <div className="p-3">
            <h3 className="text-xs font-semibold text-slate-500 mb-2 px-3">PLANNING</h3>
            <nav className="space-y-1">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 px-3 py-1.5 text-sm rounded-sm",
                  isActive("/") && !isActive("/backlog") && !isActive("/list") && !isActive("/goals")
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-100",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Board</span>
              </Link>

              <Link
                href="/backlog"
                className={cn(
                  "flex items-center gap-3 px-3 py-1.5 text-sm rounded-sm",
                  isActive("/backlog") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-100",
                )}
              >
                <ListTodo className="h-4 w-4" />
                <span>Backlog</span>
              </Link>

              <Link
                href="/list"
                className={cn(
                  "flex items-center gap-3 px-3 py-1.5 text-sm rounded-sm",
                  isActive("/list") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-100",
                )}
              >
                <List className="h-4 w-4" />
                <span>List</span>
              </Link>

              <Link
                href="/goals"
                className={cn(
                  "flex items-center gap-3 px-3 py-1.5 text-sm rounded-sm",
                  isActive("/goals") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-100",
                )}
              >
                <Target className="h-4 w-4" />
                <span>Goals</span>
              </Link>
            </nav>
          </div>

          <div className="mt-auto p-4 border-t text-xs text-slate-500">
            <p>You&apos;re in a team-managed project</p>
            <button className="text-blue-500 hover:underline">Learn more</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

