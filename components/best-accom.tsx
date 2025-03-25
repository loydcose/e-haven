import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const accommodations = [
  {
    id: 1,
    image: "/best-accom1.png",
    title: "NIPA HUT COTTAGE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni aspernatur vel fugiat cupiditate doloribus consequatur non ea eveniet ab incidunt nihil itaque ut explicabo repudiandae, debitis blanditiis libero. Voluptas voluptatem debitis deserunt corporis consectetur enim vero eveniet illo at? Sapiente atque incidunt placeat possimus consectetur illo asperiores quis officia totam.",
  },
  {
    id: 2,
    image: "/best-accom2.png",
    title: "NIPA HUT COTTAGE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni aspernatur vel fugiat cupiditate doloribus consequatur non ea eveniet ab incidunt nihil itaque ut explicabo repudiandae, debitis blanditiis libero. Voluptas voluptatem debitis deserunt corporis consectetur enim vero eveniet illo at? Sapiente atque incidunt placeat possimus consectetur illo asperiores quis officia totam.",
  },
  {
    id: 3,
    image: "/best-accom3.png",
    title: "NIPA HUT COTTAGE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni aspernatur vel fugiat cupiditate doloribus consequatur non ea eveniet ab incidunt nihil itaque ut explicabo repudiandae, debitis blanditiis libero. Voluptas voluptatem debitis deserunt corporis consectetur enim vero eveniet illo at? Sapiente atque incidunt placeat possimus consectetur illo asperiores quis officia totam.",
  },
]

export default function BestAccom() {
  return (
    <div className="bg-amber-900 py-8 md:py-16">
      <div className="mx-auto w-[80%] text-white">
        <h1 className="tracking-tight font-extrabold text-3xl md:text-4xl text-center mb-8 md:mb-16">
          See our best Accommodations
        </h1>

        <ul className="gap-6">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {accommodations.map((accom) => (
                <CarouselItem
                  key={accom.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <li key={accom.id}>
                    <div className="w-full aspect-square mb-3">
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
                    <p className="mb-4 opacity-80 text-sm">
                      {accom.description}
                    </p>
                    <Button
                      type="button"
                      variant={"secondary"}
                      className="mx-auto w-full"
                    >
                      More info
                    </Button>
                  </li>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-10%] lg:left-[-5%]" />
            <CarouselNext className="right-[-10%] lg:right-[-5%]" />
          </Carousel>
        </ul>
      </div>
    </div>
  )
}
