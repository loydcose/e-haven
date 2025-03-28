import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React from "react"

export default function page() {
  return (
    <main>
      <section className="relative">
        <div className="bg-black/20 absolute inset-0 -z-10"></div>
        <div className="size-full absolute inset-0 -z-20">
          <Image
            src="/navigation/background.png"
            alt="header background image"
            width={1737}
            height={841}
            className="size-full object-cover object-top"
          />
        </div>
        <div className="text-white mx-auto w-11/12 z-10 flex flex-col h-full">
          <NavBar />
          <h1 className="mb-12 md:mb-16 font-bold text-3xl md:text-5xl text-center">
            When are we located?
          </h1>
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start mb-16 md:mb-20">
            <div className="w-full lg:max-w-[500px] grow shrink-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1743132647085!6m8!1m7!1srfRMn_NPpPfCsRz5H7t6jQ!2m2!1d14.65585995774265!2d121.227626573229!3f315.2945977497759!4f-25.991192482704022!5f0.7820865974627469"
                width="100%"
                height="100%"
                style={{ border: "0" }}
                className="aspect-[4/3]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="bg-black/50 p-4 md:p-8">
              Nature’s Haven Resort is a serene and picturesque destination
              located at Binayoyo-Calawis Rd., Antipolo, Philippines, 1870,
              offering an idyllic escape for those seeking relaxation and
              adventure amidst nature&apos;s beauty. This eco-friendly resort
              seamlessly blends modern comforts with breathtaking natural
              landscapes, providing a perfect getaway for guests to unwind and
              recharge.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
