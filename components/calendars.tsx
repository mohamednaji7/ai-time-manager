import { Disclosure } from "@headlessui/react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarsProps {
  calendars: Array<{
    name: string
    items: string[]
  }>
}

export function Calendars({ calendars }: CalendarsProps) {
  return (
    <div className="space-y-2 px-2">
      {calendars.map((calendar, index) => (
        <Disclosure key={index} defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
                <span>{calendar.name}</span>
                <ChevronDown className={cn("h-5 w-5 transition-transform", open ? "rotate-180 transform" : "")} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-1 pb-2 text-sm">
                <ul className="space-y-1">
                  {calendar.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <button className="w-full text-left py-1 px-2 rounded hover:bg-gray-100">{item}</button>
                    </li>
                  ))}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}

