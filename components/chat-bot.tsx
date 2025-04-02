"use client"

import Image from "next/image"
import React, { useState, useRef, useEffect } from "react"
import { Input } from "./ui/input"
import ReactMarkdown from "react-markdown"
import { X } from "lucide-react"
import { Button } from "./ui/button"

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content: "Hello, I'm Chatie! How can I help you today?",
      },
    ]
  )
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async () => {
    if (!input.trim()) return

    // Add user message to the chat
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // Send the messages to the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })
      const data = await response.json()

      if (data.messages) {
        // Update the chat with the response from the API
        setMessages(data.messages)
      } else {
        // Handle error response
        const errorMessage = {
          role: "assistant",
          content: "Something went wrong. Please try again later.",
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error)
      const errorMessage = {
        role: "assistant",
        content: "Something went wrong. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      className={`fixed bottom-8 right-[4%] bg-yellow-500 rounded-2xl ${
        open && "left-[4%] md:left-auto w-[93%] md:max-w-[600px] right-0"
      }`}
    >
      {open && (
        <div className="p-4">
          <div className="flex justify-between items-center gap-2 mb-3">
            <p className="w-full text-black/90 font-bold bg-yellow-400 rounded-xl shadow-md p-2 text-center">
            ChatBot AI
            </p>
          <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <X />
            </Button>
          </div>
            <div className="mx-auto">

            {/* Chat messages */}
            <div
              ref={chatContainerRef}
              className="h-[60vh] overflow-y-auto bg-white p-3 rounded-lg shadow-inner mb-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 mb-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Image
                      src="/avatar.png"
                      alt="bot avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div
                    className={`prose p-3 shadow-md rounded-xl text-sm ${
                      message.role === "user"
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        a: ({ ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-700 underline"
                          />
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-start gap-2 mb-3 justify-start">
                  <Image
                    src="/avatar.png"
                    alt="bot avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="p-3 shadow-md rounded-xl text-sm bg-gray-200 text-black">
                    Typing...
                  </p>
                </div>
              )}
            </div>

            {/* Input box */}
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Type your message here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit()
                }}
                className="bg-white p-2 w-full shadow-md"
              />
              <button type="button" onClick={handleSubmit} disabled={loading}>
                <Image
                  src="/footer/ai-message.png"
                  alt="send message icon"
                  width={40}
                  height={40}
                  className="shrink-0"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <button
          type="button"
          className="flex items-center gap-2 rounded-full md:rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition-all p-2 md:p-4 shadow-lg"
          onClick={() => setOpen(true)}
        >
          <p className="text-white font-bold hidden md:block">
            Talk to Chatbot AI
          </p>
          <Image
            src="/footer/ai-message.png"
            alt="message icon"
            width={40}
            height={40}
            className="shrink-0"
          />
        </button>
      )}
    </div>
  )
}
