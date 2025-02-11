import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between gap-4 py-6">
      <div className="w-[289px] md:w-[389px]">
        <Image
          src="/logo.png"
          alt="e-haven logo"
          width={389}
          height={81}
          className="object-cover size-full"
        />
      </div>

      <div className="md:flex hidden items-center gap-8">
        <div className="flex items-center gap-6 text-white font-bold">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="/accommodations">
            Accommodation
          </Link>
          <Link className="hover:underline" href="/about">
            About
          </Link>
        </div>

        <Button type="button">Book now</Button>
        <Button
          type="button"
          size={"icon"}
          className="rounded-full overflow-hidden"
        >
          <Image
            src="/avatar.png"
            alt="avatar"
            width={84}
            height={84}
            className="size-full object-cover"
          />
        </Button>
      </div>
    </nav>
  )
}
