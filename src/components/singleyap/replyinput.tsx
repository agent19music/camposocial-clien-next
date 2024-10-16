"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export const ReplyInput = ({ onReply }) => {
  const [replyText, setReplyText] = React.useState('')
  const maxLength = 280

  return (
    <div className="flex gap-3 py-3">
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage src="https://api.dicebear.com/6.x/avataaars/svg?seed=CurrentUser" />
        <AvatarFallback>CU</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Textarea
          placeholder="Post your reply"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value.slice(0, maxLength))}
          className="min-h-[120px] resize-none border-none focus-visible:ring-0 p-0 text-[17px] placeholder:text-muted-foreground"
        />
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-muted-foreground">
            {replyText.length}/{maxLength}
          </div>
          <Button 
            onClick={() => {
              if (replyText.trim()) {
                onReply(replyText)
                setReplyText('')
              }
            }} 
            disabled={!replyText.trim()}
            className="rounded-full"
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  )
}