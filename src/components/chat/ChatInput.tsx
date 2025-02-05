import type React from "react"
import { Smile, Send, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  handleSend: () => void
  replyingTo: number | null
  setReplyingTo: (value: number | null) => void
  messages: any[]
  handleMediaInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSend,
  replyingTo,
  setReplyingTo,
  messages,
  handleMediaInputChange,
}) => {
  return (
    <div className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-lg border-t p-6">
      {replyingTo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-sm text-slate-600 dark:text-slate-300 mb-3 flex justify-between items-center bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg max-w-4xl mx-auto"
        >
          <span className="truncate">Replying to: {messages.find((m) => m.id === replyingTo)?.content}</span>
          <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
            Cancel
          </Button>
        </motion.div>
      )}
      <div className="flex gap-3 items-center bg-white dark:bg-slate-800 rounded-full p-2 pr-3 shadow-sm max-w-4xl mx-auto">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Smile className="h-5 w-5" />
        </Button>
        <Input
          placeholder="iMessage"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow border-0 focus:ring-0 bg-transparent text-base"
        />
        <input
          type="file"
          id="imageInput"
          accept="image/*, video/*"
          multiple
          className="hidden"
          onChange={handleMediaInputChange}
        />
        <label htmlFor="imageInput">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ImageIcon className="h-5 w-5" />
          </Button>
        </label>
        <Button onClick={handleSend} size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default ChatInput

