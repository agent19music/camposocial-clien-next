"use client"

import type React from "react"
import { useState, useEffect, useRef, useContext } from "react"
import { ChatContext } from "@/context/chatcontext"
import Sidebar from "@/components/chat/Sidebar"
import ChatHeader from "@/components/chat/ChatHeader"
import ChatMessages from "@/components/chat/ChatMessages"
import ChatInput from "@/components/chat/ChatInput"

const IMessageDesktop = () => {
  const {
    sendMessage,
    getMessages,
    addReaction,
    friendId,
    setFriendId,
    messages,
    setMessages,
    chatList = [],
  } = useContext(ChatContext)

  const [input, setInput] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<FileList | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [batch, setBatch] = useState(1)

  const simulateReceivedMessage = () => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const receivedMessage = {
        id: messages.length + 2,
        senderId: "Alice", // Replace with actual sender ID
        content: "That's great to hear!",
        timestamp: new Date(),
        media: null,
        reactions: [],
        isSent: false,
        isRead: false,
        encrypted: false,
      }
      setMessages((prevMessages) => [...prevMessages, receivedMessage])
    }, 3000)
  }

  const handleSend = async () => {
    if (input.trim() || selectedMedia) {
      await sendMessage(input, selectedMedia, replyingTo)
      setInput("")
      setReplyingTo(null)
      setSelectedMedia(null)
      simulateReceivedMessage() // Simulate receiving a message
    }
  }

  const handleReaction = (messageId: number, reactionType: string) => {
    addReaction(messageId, reactionType)
  }

  const handleMediaInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedMedia(event.target.files)
    }
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    if (scrollTop === 0) {
      // Reached the top, load more messages
      setBatch((prevBatch) => prevBatch + 1)
      getMessages(friendId!, 10 * batch, messages?.id) // Fetch next batch
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef]) //Corrected dependency

  return (
    <div className="fixed inset-0 flex items-stretch bg-slate-100 dark:bg-slate-900">
      <Sidebar chatList={chatList} setFriendId={setFriendId} />
      <div className="flex-grow flex flex-col max-w-6xl mx-auto">
        <ChatHeader isTyping={isTyping} />
        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          handleReaction={handleReaction}
          scrollAreaRef={scrollAreaRef}
        />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
          messages={messages}
          handleMediaInputChange={handleMediaInputChange}
        />
      </div>
    </div>
  )
}

export default IMessageDesktop

