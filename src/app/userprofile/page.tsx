"use client"

import { useState, useRef, useCallback } from "react"
import { FixedCropper, ImageRestriction } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import 'react-advanced-cropper/dist/themes/corners.css';

export default function Component() {
  const [isEditing, setIsEditing] = useState(false)
  const [category, setCategory] = useState("open")
  const [src, setSrc] = useState<string | null>(null)
  const [avatarSrc, setAvatarSrc] = useState("/placeholder-user.jpg")
  const [croppedImage, setCroppedImage] = useState<string | null>(null) // State to hold cropped image
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setSrc(reader.result as string)
        setAvatarSrc(reader.result as string) // Update avatar with selected image immediately
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const applyCrop = useCallback((croppedImageSrc: string) => {
    setAvatarSrc(croppedImageSrc)
    setCroppedImage(croppedImageSrc) // Save cropped image to send to server
    setSrc(null)
  }, [])

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSave = async () => {
    setIsEditing(false)
    try {
      // Send the cropped image as part of the profile data
      const updatedProfile = {
        avatar: croppedImage, // Ensure cropped image is sent
        email: "john.doe@example.com",
        location: "San Francisco, CA",
        bio: "I'm a software engineer passionate about building great products.",
        phone: "0712345678",
        category: category,
      }
      await patchProfile(updatedProfile)
      console.log('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const patchProfile = async (profileData: any) => {
    const response = await fetch('/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })

    if (!response.ok) {
      throw new Error('Failed to update profile')
    }

    return response.json()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-muted/20 p-6 flex flex-col items-center">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarSrc} alt="User's profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full"
            onClick={triggerFileUpload}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onSelectFile}
          />
        </div>
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-muted-foreground">@johndoe</p>
      </CardHeader>
      <CardContent className="p-6 grid gap-4">
        {src && (
          <div className="grid gap-2">
            <Label>Crop your image</Label>
            <FixedCropper
              src={src}
              stencilProps={{
                handlers: false,
                lines: false,
                movable: false,
                resizable: false,
                cornersStyle: {
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '7px solid #000000',
                  width: '15px',
                  height: '15px',
                },
              }}
              stencilSize={{
                width: 360,
                height: 360,
              }}
              imageRestriction={ImageRestriction.stencil}
            />
            <Button onClick={() => setSrc(null)}>Cancel Crop</Button>
            <Button onClick={() => applyCrop(src)}>Apply Crop</Button>
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value="john.doe@example.com" disabled={!isEditing} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value="San Francisco, CA" disabled={!isEditing} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={3}
            value="I'm a software engineer passionate about building great products."
            disabled={!isEditing}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value="0712345678" type="tel" disabled={!isEditing} />
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
          <Button variant="outline" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
