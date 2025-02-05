"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface UsernameEmailFormProps {
  onSubmit: (username: string, email: string) => void
}

export function UsernameEmailForm({ onSubmit }: UsernameEmailFormProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(username, email)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  )
}

