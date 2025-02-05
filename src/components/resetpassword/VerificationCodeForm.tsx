"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface VerificationCodeFormProps {
  onSubmit: (code: string) => void
}

export function VerificationCodeForm({ onSubmit }: VerificationCodeFormProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Move focus to the next input
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(code.join(""))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code-0">Verification Code</Label>
        <div className="flex space-x-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              pattern="\d"
              maxLength={1}
              className="w-10 text-center"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              required
            />
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full">
        Verify
      </Button>
    </form>
  )
}

