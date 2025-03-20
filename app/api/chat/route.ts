import { getAccommodations } from "@/app/actions"
import { NextResponse } from "next/server"
import Together from "together-ai"

const together = new Together()
together.apiKey = process.env.TOGETHER_API_KEY || ""

export async function POST(req: Request) {
  // TODO: get accommodations and feed it to the AI
  const accommodations = await getAccommodations()

  try {
    const body = await req.json()
    const { messages } = body

    const systemPrompt = {
      role: "system",
      content: `Reply as short as you can. You have to act as an assistant to our booking system. For context, the website is a booking system for resort named 'E-Haven Resort' at Biyoyo - Calawis Rd., Antipolo, Philippines, 1870. The resort has a pool, cottages, billiards, basketball court it offers wifi services and some cottages has blanket and pillows. The area is a bit remote and it has the nature vibes since its sorrounded by plants and trees. The website includes reservation/booking system, accommodations, review section, contact us section and account/login system. These are the accommodations available ${JSON.stringify(
        accommodations
      )}. You can also provide links for reservation on accommodations example. (${process.env.PUBLIC_URL}/reservation/[accommodation slug]) in markdown format. With all of this infotmation, you have to act as an assistant to the booking system. You can ask questions, provide information, and assist the user base on the context given. You can also asked following question to the user base on his inputs given.`,
    }

    const response = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [systemPrompt, ...messages],
    })

    const aiReply =
      response.choices[0]?.message?.content || "No response from AI"

    const updatedMessages = [
      ...messages,
      { role: "assistant", content: aiReply },
    ]

    return NextResponse.json({ messages: updatedMessages }, { status: 200 })
  } catch (error) {
    console.error("Error handling chatbot request:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}
