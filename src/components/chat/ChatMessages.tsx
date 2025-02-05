import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { Check, CheckCheck, Smile } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
  avatar: string
  reactions: string[]
  replyTo?: number
  isSent: boolean
  isRead: boolean
  effect?: JSX.Element
  media?: { type: string; url: string }[]
}

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
  handleReaction: (messageId: number, reaction: string) => void
  scrollAreaRef: React.RefObject<HTMLDivElement>
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping, handleReaction, scrollAreaRef }) => {
  return (
    <ScrollArea className="flex-grow px-6" ref={scrollAreaRef}>
      <div className="py-6 max-w-4xl mx-auto">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center h-full"
            >
              <p className="text-lg text-gray-500 dark:text-gray-400">No messages yet. Start the conversation!</p>
            </motion.div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.3,
                }}
                className={`mb-6 ${message.isSent ? "flex justify-end" : "flex justify-start items-end gap-2"}`}
              >
                {!message.isSent && (
                  <Avatar className="h-6 w-6 hidden sm:block">
                    <AvatarImage src={message.avatar} alt={message.sender} />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`relative max-w-[60%] ${
                    message.isSent
                      ? "bg-blue-500 text-white rounded-2xl rounded-tr-sm"
                      : "bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm"
                  } p-3 px-4 shadow-sm group`}
                >
                  {message.replyTo && (
                    <div className="text-xs mb-2 p-2 rounded bg-black/5 dark:bg-white/5">
                      Replying to: {messages.find((m) => m.id === message.replyTo)?.content}
                    </div>
                  )}
                  {message.media &&
                    message.media.map((mediaItem, index) => (
                      <div key={index} className="mt-2">
                        {mediaItem.type === "image" && (
                          <img
                            src={mediaItem.url || "/placeholder.svg"}
                            alt={`Attachment ${index}`}
                            className="max-w-full h-auto rounded-lg"
                          />
                        )}
                        {mediaItem.type === "video" && (
                          <video src={mediaItem.url} controls className="max-w-full h-auto rounded-lg" />
                        )}
                      </div>
                    ))}
                  <p className="leading-relaxed text-base">{message.content}</p>
                  <div className="flex justify-between items-end mt-1 gap-2">
                    <div className="flex gap-1 flex-wrap">
                      {message.reactions.map((reaction, index) => (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          key={index}
                          className="text-xs bg-white/10 dark:bg-black/20 rounded-full px-1.5 py-0.5"
                        >
                          {reaction}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs opacity-70">{format(message.timestamp, "HH:mm")}</span>
                      {message.isSent &&
                        (message.isRead ? (
                          <CheckCheck className="h-3 w-3 text-blue-300" />
                        ) : (
                          <Check className="h-3 w-3" />
                        ))}
                    </div>
                  </div>
                  {message.effect && (
                    <div
                      className={`absolute ${message.isSent ? "left-0 -translate-x-full" : "right-0 translate-x-full"} top-1/2 -translate-y-1/2`}
                    >
                      {message.effect}
                    </div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => handleReaction(message.id, "👍")}>👍 Like</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleReaction(message.id, "❤️")}>❤️ Love</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleReaction(message.id, "😂")}>😂 Laugh</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex gap-2 ml-4"
          >
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: dot * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </ScrollArea>
  )
}

export default ChatMessages

