import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function Footer() {
  return (
    <footer className="text-white">
      {/* Top */}
      <section className="bg-amber-900 py-6 md:py-8">
        <div className="mx-auto w-11/12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="size-full">
            <Image
              src="/footer/background.jpg"
              alt="footer image"
              width={820}
              height={369}
              className="size-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-3 col-span-2">
            <div className="flex flex-col gap-2 md:col-span-2">
              <h4 className="font-bold">CONTACT INFORMATION</h4>
              <div className="flex items-center gap-2">
                <Image
                  src="/footer/contact.png"
                  alt="contact icon"
                  width={26}
                  height={26}
                  className="shrink-0"
                />
                <p className="text-sm opacity-75">09087989760 / 09305588303</p>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src="/footer/calendar.png"
                  alt="calendar icon"
                  width={27}
                  height={27}
                  className="shrink-0"
                />
                <p className="text-sm opacity-75">
                  Monday to Friday from 8am to 5pm | Weekends from 8am - 9pm
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src="/footer/location.png"
                  alt="location icon"
                  width={30}
                  height={30}
                  className="shrink-0"
                />
                <p className="text-sm opacity-75">
                  Biyoyo - Calawis Rd., Antipolo, Philippines, 1870
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src="/footer/email.png"
                  alt="email icon"
                  width={30}
                  height={30}
                  className="shrink-0"
                />
                <p className="overflow-auto text-sm opacity-75 break-words">
                  natureshaven.20resort@gmail.com
                </p>
              </div>

              {/* socials */}
              <div>
                <div className="flex items-center">
                  <p className="font-bold text-sm">FOLLOW US</p>
                  <Link
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61558015206603"
                  >
                    <Image
                      src="/footer/socials.png"
                      alt="social icons"
                      width={100}
                      height={50}
                    />
                  </Link>
                </div>
                <p className="text-sm opacity-75">Social Media Channels</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">EXPLORE</p>
              <Link
                href="/accommodations"
                className="text-sm opacity-75 hover:underline"
              >
                Accommodations
              </Link>
              <Link
                href="/navigation"
                className="text-sm opacity-75 hover:underline"
              >
                Navigation
              </Link>
              <Link
                href="/virtual-tour"
                className="text-sm opacity-75 hover:underline"
              >
                Virtual Tour
              </Link>
              <Link
                href="/terms-condition"
                className="text-sm opacity-75 hover:underline"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm opacity-75 hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/accommodations"
                className="text-sm opacity-75 hover:underline"
              >
                Book Now
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">CREDITS</p>
              <p className="text-sm opacity-75">Group Tech Titans</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <p className="bg-green-600 text-center text-white/75 p-2 text-sm">
        @nature&apos;s Haven Resort
      </p>
    </footer>
  )
}
