import Image from "next/image"
import StarFilled from "./icons/star-filled"
import { Button } from "./ui/button"
import StarUnfilled from "./icons/star-unfilled"
import MakeReview from "./make-review"

const reviews = [
  {
    name: "Angelo Solomon",
    review:
      "An unforgettable experience! Our stay at this resort was simply magical. The views are stunning, especially at sunrise, and the peaceful surroundings make it a true getaway. The cottage we stayed in was both luxurious and comfortable, with thoughtful touches everywhere. We can’t wait to come back!",
    image: "/avatar.png",
  },
  {
    name: "Airon Manaligod",
    review:
      "A hidden gem! This resort is truly a hidden gem! Tucked away in beautiful scenery, it felt like we had our own private sanctuary. The staff were friendly and attentive, and the cottage was immaculate. Highly recommend for anyone looking for a serene and restful vacation.",
    image: "/avatar.png",
  },
  {
    name: "Veronica Original",
    review: "Very demure!",
    image: "/avatar.png",
  },
]

export default function GuestReviews() {
  return (
    <div className="bg-amber-100 py-8 md:py-16">
      <section className="mx-auto w-11/12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-extrabold tracking-tight mb-4 md:mb-6 text-center text-3xl md:text-4xl">
            Guest Reviews
          </h2>

          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-green-700 text-white mb-3 last:mb-6 bg-gree-700 rounded-xl p-3 md:p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3 border-b border-b-white/40 py-2">
                <div className="flex items-center gap-2">
                  <div className="size-[40px] rounded-full overflow-hidden">
                    <Image
                      src={review.image}
                      alt={`${review.name}'s avatar`}
                      width={40}
                      height={40}
                      className="size-full object-cover"
                    />
                  </div>
                  <h4>{review.name}</h4>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((item, index) => (
                    <StarFilled
                      key={index}
                      className="size-[16px] md:size-[18px]"
                    />
                  ))}
                  {[1, 2].map((item, index) => (
                    <StarUnfilled
                      key={index}
                      className="size-[16px] md:size-[18px]"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm opacity-90">{review.review}</p>
            </div>
          ))}
          <div className="w-full md:w-fit mx-auto">
            <Button
              type="button"
              variant={"secondary"}
              className="w-full md:w-24 font-medium "
            >
              See All
            </Button>
          </div>
        </div>

        {/* contact section */}
        <MakeReview />
      </section>
    </div>
  )
}
