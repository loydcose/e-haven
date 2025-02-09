import Image from "next/image"
import React from "react"

export default function ChatBot() {
  return (
    <button
      type="button"
      className="fixed bottom-8 right-[4%] flex items-center gap-2 rounded-full md:rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition-all p-2 md:p-4 shadow-lg"
    >
      <p className="text-white font-bold hidden md:block">Talk to Chatbot AI</p>
      <Image
        src="/footer/ai-message.png"
        alt="message icon"
        width={40}
        height={40}
        className="shrink-0"
      />
    </button>
  )
}
