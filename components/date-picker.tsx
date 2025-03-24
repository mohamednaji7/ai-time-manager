"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="p-2">
      <Calendar mode="single" selected={date} onSelect={setDate} className={cn("rounded-md border")} />
    </div>
  )
}

