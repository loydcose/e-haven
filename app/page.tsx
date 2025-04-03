import BestAccom from "@/components/best-accom"
import ChatBot from "@/components/chat-bot"
import CookieBanner from "@/components/cookie-banner"
import Footer from "@/components/footer"
import GuestReviews from "@/components/guest-reviews"
import HowToBook from "@/components/how-to-book"
import NavBar from "@/components/nav-bar"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="absolute inset-0 -z-10 isolate">
          <div className="bg-black/50 absolute inset-0"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="size-full object-cover"
          >
            <source src="/videos/home.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="mx-auto w-11/12">
          <NavBar />
          <h1 className="font-extrabold text-5xl md:text-7xl text-center text-white tracking-tight md:leading-[60px] mb-10 mt-10 md:mb-16 md:mt-16 drop-shadow-xl">
            Welcome to
            <br />
            Nature&apos;s Haven Resort
          </h1>
          <div className="flex flex-col md:flex-row items-center mx-auto justify-center gap-2 md:gap-4 flex-wrap mb-4">
            <Link
              href="/virtual-tour"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hover:bg-amber-200 transition-all bg-amber-100 text-black font-bold md:h-12 md:text-base w-full md:w-fit"
              )}
            >
              Take a tour
            </Link>
            <Link
              href="/navigation"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hover:bg-amber-200 transition-all bg-amber-100 text-black font-bold md:h-12 md:text-base w-full md:w-fit"
              )}
            >
              Where are we located?
            </Link>
          </div>
        </div>
        <div className="bg-black/50 mt-auto italic leading-5">
          <p className="text-sm md:text-base text-white opacity-80 py-6 pl-[5%] pr-[5%]">
            Your serene escape nestled deep within a pristine forest. Surrounded
            by fresh air and crystal-clear waters, our resort offers the perfect
            retreat for nature lovers and adventurers alike. Whether you&apos;re
            here for a peaceful overnight stay or seeking a tranquil
            environment for your team, we provide comfortable accommodations and
            a warm, welcoming atmosphere. Experience the beauty of nature while
            enjoying the comforts of home at Nature&apos;s Haven Resort.
          </p>
        </div>
      </div>
      <BestAccom />
      <GuestReviews />
      <HowToBook />
      <Footer />
      <ChatBot />
      <CookieBanner />
    </>
  )
}
