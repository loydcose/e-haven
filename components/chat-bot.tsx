"use client"

import Image from "next/image"
import React from "react"
import { Input } from "./ui/input"

export default function ChatBot() {
  const [open, setOpen] = React.useState(true)

  return (
    <div
      // TODO: The chatbox open is on the left side on wide screen
      className={`fixed bottom-8 right-[4%] bg-yellow-500 rounded-2xl ${
        open && "left-[4%] md:left-auto max-w-[400px] right-0"
      }`}
    >
      {open && (
        <div className="">
          <p className="text-black/90 font-bold text-lg md:text-xl bg-yellow-400 rounded-2xl shadow-md p-3 md:py-4 text-center mb-3 md:mb-4">
            ChatBot AI
          </p>
          <div className="w-11/12 mx-auto pb-4">
            <p className="text-white text-center mb-3 md:mb-4 text-sm">
              Do you have any questions? Feel free to ask Chatie!
            </p>
            <div className="flex items-center gap-2">
              <Image
                src="/avatar.png"
                alt="user avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-black/75 p-3 shadow-md rounded-xl bg-white text-sm">
                Hello, I am Chatie! What can I get started for you today?
              </p>
            </div>

            {/* chatbox */}
            <div className="flex items-center gap-2 mt-24">
              <Input
                type="text"
                placeholder="Type your message here"
                className="bg-white p-2 w-full shadow-md"
              />
              <button type="button" onClick={() => setOpen(false)}>
                <Image
                  src="/footer/ai-message.png"
                  alt="message icon"
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
