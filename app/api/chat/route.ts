import { getAccommodations } from "@/app/actions"
import { NextResponse } from "next/server"
import Together from "together-ai"
import * as Sentry from "@sentry/nextjs"

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
      content: `You are an AI assistant for E-Haven Resort's booking system. Your role is to help users with their inquiries and bookings. Here's how you should behave:

1. Be friendly and conversational, but professional
2. Provide concise, clear, and accurate information
3. Ask relevant follow-up questions to better understand user needs
4. Offer specific accommodation recommendations based on user preferences
5. Include relevant links when suggesting accommodations

Context about E-Haven Resort:
- Location: Biyoyo - Calawis Rd., Antipolo, Philippines, 1870
- Environment: Nature-focused resort surrounded by plants and trees
- Amenities: Pool, cottages, billiards, basketball court, WiFi services
- Some cottages include blankets and pillows
- Remote location with natural surroundings

Available accommodations: ${JSON.stringify(accommodations)}

When suggesting accommodations:
1. Consider user preferences (e.g., number of beds, amenities)
2. Mention specific features that match their needs
3. Provide the reservation link: ${process.env.PUBLIC_URL}/reservation/[accommodation-slug] in markdown format
4. Include pricing information when relevant

Example responses:
- "Based on your preference for a quiet stay, I'd recommend [accommodation name]. It offers [specific features] and is perfect for [use case]. You can book it here: [link]"
- "I notice you're interested in [feature]. Would you like me to suggest accommodations that offer this?"
- "For your group size of [number], I recommend [accommodation] which has [specific features]. The price is [amount] per night."

Remember to:
- Keep responses very short and concise but informative
- Ask clarifying questions when needed
- Provide specific details about accommodations
- Include booking links when relevant
- Be proactive in suggesting options based on user needs
- And most specially don't do programming or coding or anything related to that.`,
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
    Sentry.captureException(error)
    console.error("Error handling chatbot request:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}
