"use client"

import { useState } from "react"
import { UsernameEmailForm } from "./UsernameEmailForm"
import { VerificationCodeForm } from "./VerificationCodeForm"
import { NewPasswordForm } from "./NewPasswordForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"

type ResetStep = "username-email" | "verification" | "new-password"

export function ResetPassword() {
  const [step, setStep] = useState<ResetStep>("username-email")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
 
  const router = useRouter()
  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || "defaultApiEndpoint";



  async function handleUsernameEmailSubmit(username: string, email: string) {
    try {
      setUsername(username);
      setEmail(email);
      const response = await fetch(`${apiEndpoint}/confirm_email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });
  
      if (response.ok) {
        toast.success('Email confirmation successful!');
        setStep("verification")
        const data = await response.json();
      } else if (response.status === 404) {
        toast.error('Email confirmation failed (404: Not Found)');
      } else {
        toast.error('Email confirmation failed:', response.statusText);
      }
    } catch (error) {
      toast.error('Error submitting form:', error);
    }
  }

  const handleVerificationSubmit = async (code: string) => {
    // Mock verification code check
    const isValid = await mockVerifyCode(code)
    if (isValid) {
      setStep("new-password")
    } else {
      alert("Invalid verification code")
    }
  }

  const handleNewPasswordSubmit = async (newPassword: string) => {
    // Mock password reset
    await resetPassword(apiEndpoint, username, newPassword)
    toast.success("Password reset successfully!")
    // Reset the form
    setUsername("")
    setEmail("")
    router.push('/login');

  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          {step === "username-email" && "Enter your username and email to reset your password."}
          {step === "verification" && "Enter the verification code sent to your email."}
          {step === "new-password" && "Enter your new password."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "username-email" && <UsernameEmailForm onSubmit={handleUsernameEmailSubmit} />}
        {step === "verification" && <VerificationCodeForm onSubmit={handleVerificationSubmit} />}
        {step === "new-password" && <NewPasswordForm onSubmit={handleNewPasswordSubmit} />}
      </CardContent>
    </Card>
  )
}

// Mock functions for API calls
async function mockValidateUsernameEmail(username: string, email: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return true // Always return true for this example
}

async function mockSendVerificationCode(email: string): Promise<void> {
  // Simulate sending verification code
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

async function mockVerifyCode(code: string): Promise<boolean> {
  // Simulate verification code check
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return true // Always return true for this example
}

async function resetPassword(apiEndpoint: string, username: string, newPassword: string): Promise<void> {
  try {
    const response = await fetch(`${apiEndpoint}/reset_password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username,
        new_password: newPassword }),
    });

    if (response.ok) {
      const data = await response.json();
    } else if (response.status === 404) {
      toast.error(response.message);
    } else {
      toast.error('Password reset failed:', response.statusText);
    }
  } catch (error) {
    toast.error('Error submitting form:', error);
  }
}

