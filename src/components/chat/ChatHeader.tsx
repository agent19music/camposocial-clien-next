import type React from "react"
import { Phone, VideoIcon, MoreVertical } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ChatHeaderProps {
  isTyping: boolean
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isTyping }) => {
  return (
    <div className="bg-slate-50/90 dark:bg-slate-800/90 py-4 px-6 flex items-center justify-between backdrop-blur-lg border-b">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alice" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Alice</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{isTyping ? "typing..." : "Online"}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-300">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-300">
          <VideoIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-300">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default ChatHeader

