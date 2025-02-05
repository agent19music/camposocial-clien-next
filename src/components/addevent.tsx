'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function AddEvent() {
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined)
  const [posterImage, setPosterImage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPosterImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        options.push(<SelectItem key={time} value={time}>{time}</SelectItem>)
      }
    }
    return options
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button >Add Event</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px] md:max-w-2xl max-h-[75vh] overflow-y-auto">
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" placeholder="Enter event title" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter event description" />
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Calendar
                  mode="single"
                  selected={eventDate}
                  onSelect={setEventDate}
                  className="rounded-md border"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Select>
                    <SelectTrigger id="startTime">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateTimeOptions()}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Select>
                    <SelectTrigger id="endTime">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateTimeOptions()}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter event location" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="entryFee">Entry Fee</Label>
                <Input id="entryFee" type="number" placeholder="Enter entry fee" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="poster">Event Poster</Label>
                <Input id="poster" type="file" accept="image/*" onChange={handleImageChange} />
                {posterImage && (
                  <div className="mt-2">
                    <Image src={posterImage} alt="Event poster preview" width={200} height={200} className="rounded-md" />
                  </div>
                )}
              </div>
              
              <Button type="submit" className="w-full">Add Event</Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}