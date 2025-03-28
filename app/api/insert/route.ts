import db from "@/lib/db"
import { NextResponse } from "next/server"

// const data = [
//   {
//     slug: "nipa-hut-cottage",
//     title: "Nipa Hut Cottage",
//     description:
//       "Open-air cottage made with bamboo and anahaw leaves as a roofing surrounded by different kinds of beautiful trees.",
//     image: "https://i.ibb.co/Dgvftxhy/img1.png",
//     price: 300,
//     amenities: [
//       "Karaoke",
//       "Billiards",
//       "Free parking",
//       "Basic kitchenwares",
//       "Air conditioning",
//       "Blanket and pillow",
//     ],
//   },
//   {
//     slug: "nipa-hut-room-cottage",
//     title: "Nipa Hut Room Cottage",
//     description:
//       "Perfect place for relaxing. It has a comfortable double-sized bed and a warm, welcoming feel. Surrounded by nature, it's a great spot to unwind and enjoy a peaceful stay.",
//     image: "https://i.ibb.co/Xfqf1VhL/img2.png",
//     price: 300,
//     amenities: [
//       "Karaoke",
//       "Billiards",
//       "Free parking",
//       "Basic kitchenwares",
//       "Dining area",
//       "Blanket and pillow",
//     ],
//   },
//   {
//     slug: "overlooking-hut-cottage",
//     title: "Overlooking Hut Cottage",
//     description:
//       "This cozy retreat invites you to unwind and connect with nature. Imagine sipping your morning coffee while soaking in the breathtaking landscape. Perfect for couples, families, or solo adventurers. Escape the everyday and create lasting memories in this enchanting hideaway!",
//     image: "https://i.ibb.co/Dyfkrqw/img3.png",
//     price: 800,
//     amenities: [
//       "Karaoke",
//       "Billiards",
//       "Free parking",
//       "Basic kitchenwares",
//       "Pet friendly",
//       "Dining area",
//     ],
//   },
//   {
//     slug: "cozy-hut-cottage",
//     title: "Cozy Hut Cottage",
//     description:
//       "Cozy space built like a small house with a spacious interior. Room has Two (2) double decks accommodating Four persons. Ideal for families or friends looking to escape the hustle and bustle.",
//     image: "https://i.ibb.co/Pz03cmgn/img4.png",
//     price: 1000,
//     amenities: [
//       "Karaoke",
//       "Billiards",
//       "Free parking",
//       "Basic kitchenwares",
//       "Air conditioning",
//       "Dining area",
//       "Blanket and pillow",
//     ],
//   },
//   {
//     slug: "family-house-nipa-cottage",
//     title: "Family House Nipa Cottage",
//     description:
//       "Comfortable place for a family getaway. Fresh and natural cold air without needing a fan. This room can accommodate Ten (10) persons with larger room space, perfect for storing bags and other belongings.",
//     image: "https://i.ibb.co/pjr85Tw7/img5.png",
//     price: 1500,
//     amenities: [
//       "Karaoke",
//       "Billiards",
//       "Free parking",
//       "Basic kitchenwares",
//       "Pet friendly",
//       "Air conditioning",
//       "Dining area",
//       "Blanket and pillow",
//     ],
//   },
// ]

export async function GET() {
  try {
    // Insert accommodations into the database
    // for (const item of data) {
    //   await db.accommodation.create({
    //     data: {
    //       slug: item.slug,
    //       title: item.title,
    //       description: item.description,
    //       image: item.image,
    //       price: item.price,
    //       amenities: item.amenities,
    //     },
    //   });
    // }

    // Update all users to have the `hasShownCookieMsg` property set to false
    await db.user.updateMany({
      data: {
        hasShownCookieMsg: false,
      },
    })

    return NextResponse.json(
      { message: "Data inserted and users updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error inserting data or updating users:", error)
    return NextResponse.json(
      {
        message: "Error inserting data or updating users",
        error: (error as { message: string }).message,
      },
      { status: 500 }
    )
  }
}
