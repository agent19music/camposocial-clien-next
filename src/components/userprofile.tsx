"use client"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function Component() {
    const [isEditing, setIsEditing] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("react")
  const [category, setCategory] = useState("open")

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-muted/20 p-6 flex flex-col items-center">
      <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder-user.jpg" alt="User's profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute bottom-0 right-0 rounded-full"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-muted-foreground">@johndoe</p>
      </CardHeader>
      <CardContent className="p-6 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value="john.doe@example.com" disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value="San Francisco, CA" disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={3}
            value="I'm a software engineer passionate about building great products."
            disabled
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">phone</Label>
          <Input id="phone" value="0712345678" type="number" disabled />
        </div>
        <div className="grid gap-2">
  <Label htmlFor="category">Course</Label>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">{category ? category : "Open"}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Enrolled Course</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
        <DropdownMenuRadioItem value="sw">Software Development</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="ui/ux">UI/UX Design</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="ds">Data Science</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="cybersec">Cyber Security</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
        <div className="flex justify-end">
          <Button variant="outline">Edit</Button>
        </div>
      </CardContent>
    </Card>
  )
}