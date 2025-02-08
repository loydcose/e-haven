import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"

export default function BestAccom() {
  return (
    <div className="bg-amber-900 py-8 md:py-16">
      <div className="mx-auto w-11/12 text-white">
        <h1 className="tracking-tight font-extrabold text-3xl md:text-4xl text-center mb-8 md:mb-16">
          See our best Accommodations
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li>
            <div className="w-full aspect-square mb-3">
              <Image
                src="/best-accom1.png"
                alt="accommodation 1"
                width={400}
                height={400}
                className="size-full object-cover"
              />
            </div>
            <h3 className="font-bold tracking-tight mb-3 text-center text-lg">
              NIPA HUT COTTAGE
            </h3>
            <p className="mb-4 opacity-80 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
              aspernatur vel fugiat cupiditate doloribus consequatur non ea
              eveniet ab incidunt nihil itaque ut explicabo repudiandae, debitis
              blanditiis libero. Voluptas voluptatem debitis deserunt corporis
              consectetur enim vero eveniet illo at? Sapiente atque incidunt
              placeat possimus consectetur illo asperiores quis officia totam.
            </p>
            <Button
              type="button"
              variant={"secondary"}
              className="mx-auto w-full"
            >
              More info
            </Button>
          </li>
          <li>
            <div className="w-full aspect-square mb-3">
              <Image
                src="/best-accom2.png"
                alt="accommodation 1"
                width={400}
                height={400}
                className="size-full object-cover"
              />
            </div>
            <h3 className="font-bold tracking-tight mb-3 text-center text-lg">
              NIPA HUT COTTAGE
            </h3>
            <p className="mb-4 opacity-80 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
              aspernatur vel fugiat cupiditate doloribus consequatur non ea
              eveniet ab incidunt nihil itaque ut explicabo repudiandae, debitis
              blanditiis libero. Voluptas voluptatem debitis deserunt corporis
              consectetur enim vero eveniet illo at? Sapiente atque incidunt
              placeat possimus consectetur illo asperiores quis officia totam.
            </p>
            <Button
              type="button"
              variant={"secondary"}
              className="mx-auto w-full"
            >
              More info
            </Button>
          </li>
          <li>
            <div className="w-full aspect-square mb-3">
              <Image
                src="/best-accom3.png"
                alt="accommodation 1"
                width={400}
                height={400}
                className="size-full object-cover"
              />
            </div>
            <h3 className="font-bold tracking-tight mb-3 text-center text-lg">
              NIPA HUT COTTAGE
            </h3>
            <p className="mb-4 opacity-80 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
              aspernatur vel fugiat cupiditate doloribus consequatur non ea
              eveniet ab incidunt nihil itaque ut explicabo repudiandae, debitis
              blanditiis libero. Voluptas voluptatem debitis deserunt corporis
              consectetur enim vero eveniet illo at? Sapiente atque incidunt
              placeat possimus consectetur illo asperiores quis officia totam.
            </p>
            <Button
              type="button"
              variant={"secondary"}
              className="mx-auto w-full"
            >
              More info
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}
