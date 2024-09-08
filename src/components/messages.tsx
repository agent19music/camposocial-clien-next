"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Smile, Send, MoreVertical, ThumbsUp, Heart, Star, Reply } from "lucide-react"
import { format } from "date-fns"

type Message = {
  id: number
  sender: string
  content: string
  timestamp: Date
  avatar: string
  reactions: string[]
  replyTo?: number
  isSent: boolean
}

export default function WhatsAppChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Alice", content: "Hey there! How's it going?", timestamp: new Date(2023, 5, 10, 10, 30), avatar: "/placeholder.svg?height=40&width=40", reactions: [], isSent: false },
    { id: 2, sender: "You", content: "Not bad, just working on a new project. You?", timestamp: new Date(2023, 5, 10, 10, 32), avatar: "/placeholder.svg?height=40&width=40", reactions: [], isSent: true },
    { id: 3, sender: "Alice", content: "That's cool! I'm just relaxing at home.", timestamp: new Date(2023, 5, 10, 10, 35), avatar: "/placeholder.svg?height=40&width=40", reactions: [], isSent: false },
  ])
  const [input, setInput] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [activeMessageId, setActiveMessageId] = useState<number | null>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        content: input,
        timestamp: new Date(),
        avatar: "/placeholder.svg?height=40&width=40",
        reactions: [],
        replyTo: replyingTo,
        isSent: true,
      }
      setMessages([...messages, newMessage])
      setInput("")
      setReplyingTo(null)
    }
  }

  const handleReaction = (messageId: number, reaction: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId
        ? { ...msg, reactions: [...msg.reactions, reaction] }
        : msg
    ))
  }

  const handleReply = (messageId: number) => {
    setReplyingTo(messageId)
  }

  const handleTouchStart = (messageId: number) => {
    setLongPressTimer(setTimeout(() => {
      setActiveMessageId(messageId)
    }, 500))
  }

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto h-[600px] flex flex-col">
      <div className="bg-primary p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alice" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-primary-foreground">Alice</h2>
            <p className="text-xs text-primary-foreground/70">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-primary-foreground">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-grow p-4 bg-muted/30" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.isSent ? 'flex justify-end' : ''}`}>
            <div
              className={`relative max-w-[80%] ${message.isSent ? 'bg-primary text-primary-foreground' : 'bg-background'} p-3 rounded-lg shadow`}
              onContextMenu={(e) => {
                e.preventDefault()
                setActiveMessageId(message.id)
              }}
              onTouchStart={() => handleTouchStart(message.id)}
              onTouchEnd={handleTouchEnd}
            >
              {message.replyTo && (
                <div className="text-xs mb-1 p-2 bg-muted/20 rounded">
                  Replying to: {messages.find(m => m.id === message.replyTo)?.content.substring(0, 20)}...
                </div>
              )}
              <p>{message.content}</p>
              <div className="flex justify-between items-end mt-1">
                <div className="flex gap-1">
                  {message.reactions.map((reaction, index) => (
                    <span key={index} className="text-xs bg-muted/20 rounded-full px-1">
                      {reaction}
                    </span>
                  ))}
                </div>
                <span className="text-xs opacity-70">
                  {format(message.timestamp, 'HH:mm')}
                </span>
              </div>
              <DropdownMenu open={activeMessageId === message.id} onOpenChange={() => setActiveMessageId(null)}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute right-0 top-0 hidden">
                    <Smile className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => handleReaction(message.id, "👍")}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    <span>Like</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleReaction(message.id, "❤️")}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Love</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleReaction(message.id, "⭐")}>
                    <Star className="mr-2 h-4 w-4" />
                    <span>Star</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleReply(message.id)}>
                    <Reply className="mr-2 h-4 w-4" />
                    <span>Reply</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-3 bg-background">
        {replyingTo && (
          <div className="text-sm text-muted-foreground mb-2 flex justify-between items-center bg-muted/30 p-2 rounded">
            <span>Replying to: {messages.find(m => m.id === replyingTo)?.content.substring(0, 20)}...</span>
            <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>Cancel</Button>
          </div>
        )}
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow"
          />
          <Button onClick={handleSend} size="icon" className="rounded-full">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}