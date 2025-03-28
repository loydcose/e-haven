"use client"

import Image from "next/image"
import React from "react"
import { buttonVariants } from "./ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Accommodation } from "@prisma/client"
import Link from "next/link"

export default function CarouselAccom({
  accommodations,
}: {
  accommodations: Accommodation[]
}) {
  return (
    <ul className="gap-6">
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {accommodations.map((accom) => (
            <CarouselItem key={accom.id} className="md:basis-1/2 lg:basis-1/3">
              <li key={accom.id} className="flex flex-col h-full">
                <div className="w-full aspect-square mb-3 rounded-lg overflow-hidden shadow-md aspect-square">
                  <Image
                    src={accom.image}
                    alt={accom.title}
                    width={400}
                    height={400}
                    className="size-full object-cover"
                  />
                </div>
                <h3 className="font-bold tracking-tight mb-3 text-center text-lg">
                  {accom.title}
                </h3>
                <p className="mb-4 opacity-80 text-sm">{accom.description}</p>
                <Link
                  href={`/reservation/${accom.slug}`}
                  className={buttonVariants({ variant: "secondary" }) + " mt-auto"}
                >
                  Book now
                </Link>
              </li>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[-10%] lg:left-[-5%]" />
        <CarouselNext className="right-[-10%] lg:right-[-5%]" />
      </Carousel>
    </ul>
  )
}
