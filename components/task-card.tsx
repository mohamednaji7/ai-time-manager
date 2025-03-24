import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, AlertCircle } from "lucide-react"

interface TaskCardProps {
  task: {
    id: number
    key: string
    title: string
    type: string
    assignee: string
    priority: string
    labels?: string[]
  }
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white rounded shadow-sm border border-slate-200 p-3 cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5">
          {task.type === "task" ? (
            <CheckSquare className="h-4 w-4 text-blue-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-slate-600">{task.key}</span>
            {task.priority === "high" && <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />}
          </div>

          <h4 className="text-sm font-medium mb-2 line-clamp-2">{task.title}</h4>

          {task.labels && task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.labels.map((label, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {label}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-purple-100 text-purple-800">{task.assignee}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

