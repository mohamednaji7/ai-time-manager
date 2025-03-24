import { SprintBoard } from "@/components/sprint-board"

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Sprint Master</h1>
      <SprintBoard />
    </main>
  )
}

