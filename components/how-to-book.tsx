"use client"

const steps = [
  {
    title: "BROWSE",
    description: "Find accommodations and filter by price, amenities, etc.",
  },
  {
    title: "SELECT",
    description: "View details, price, and images.",
  },
  {
    title: "CHECK AVAILABILITY",
    description: `Click "Book Now" to see available dates.`,
  },
  {
    title: "FILL OUT FORM",
    description: `Enter your details and payment method.`,
  },
  {
    title: "CONFIRMATION",
    description: `Review and confirm your booking.`,
  },
]

export default function HowToBook() {
  return (
    <div className="bg-amber-100 py-20 md:py-40">
      <section className="mx-auto w-11/12">
        <h2 className="font-extrabold tracking-tight mb-6 md:mb-8 text-center text-3xl md:text-4xl">
          HOW TO BOOK A RESERVATION?
        </h2>
        <ul className="flex items-start gap-4 flex-wrap">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl grow basis-1/6 min-w-[300px] md:min-w-[200px] shadow-xl"
            >
              <h5 className="font-bold text-lg md:text-xl p-4 bg-amber-900 text-white text-center rounded-tl-xl rounded-tr-xl ">
                {index + 1}. {step.title}
              </h5>
              <p className="p-4 bg-green-700 text-white text-center rounded-bl-xl rounded-br-xl">
                {step.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
