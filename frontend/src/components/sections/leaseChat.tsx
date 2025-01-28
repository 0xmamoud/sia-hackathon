"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendHorizonal } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  timestamp: Date
  sender: "user" | "response"
}

export function LeaseChat({ leaseId }: { leaseId: number }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: newMessage,
        timestamp: new Date(),
        sender: "user",
      }

      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")

      setTimeout(() => {
        const responseMessage: Message = {
          id: messages.length + 2,
          text: `This is a response to "${newMessage}"`,
          timestamp: new Date(),
          sender: "response",
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 1000)
    }
  }

  return (
    <div className="h-[97%] w-[500px] flex flex-col border-l text-lg font-inter">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "p-4 rounded-xl max-w-[70%] text-white",
                message.sender === "user"
                  ? "bg-blue-500"
                  : "bg-gray-300 text-gray-900"
              )}
            >
              <div className={cn("text-sm", message.sender === "user" ? "text-gray-200" : "text-shade-gray")} >
                {message.timestamp.toLocaleTimeString()}
              </div>
              <div>{message.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            type="text"
            className="md:text-lg"
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="p-2  hover:bg-blue-800 text-white"
            asChild
          >
            <SendHorizonal size={28} className="md:w-20 md:h-10" />
          </Button>
        </div>
      </div>
    </div>
  )
}

