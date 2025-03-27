import { cn } from "@/lib/utils"
import Image from "next/image"

export default function page() {
  return (
    <main className="bg-amber-900 py-16 md:py-24">
      <div
        className={cn(
          "prose prose-sm md:prose-base text-white prose-headings:text-amber-300 prose-strong:font-bold prose-strong:text-white",
          "mx-auto w-[90%] max-w-2xl"
        )}
      >
        <Image
          src="/logo.png"
          alt="e-haven logo"
          width={550}
          height={115}
          className="block mx-auto w-full max-w-md mb-18 md:mb-24"
        />
        <h1>E-haven Terms and Conditions</h1>
        <i>Updated: March 27, 2025</i>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>e-haven</strong>, the official online booking
            platform for <strong>Haven Nature&apos;s Resort</strong>. By
            accessing or using our website, you agree to comply with and be
            bound by these Terms and Conditions.
          </p>
          <p>
            These terms govern your use of our services, including viewing
            accommodations, making bookings, and communicating with our
            platform. If you do not agree with these terms, please do not use
            our platform.
          </p>
        </section>

        <section>
          <h2>2. Account Registration</h2>
          <p>
            Users must create an account to make a booking. By registering, you
            agree to provide accurate and complete information, including:
          </p>
          <ul>
            <li>
              First name, last name, username, verified email, and a secure
              password.
            </li>
            <li>Maintaining the confidentiality of your login details.</li>
            <li>Using a strong password and verifying your email.</li>
          </ul>
          <p>
            You may delete your account at any time. This will erase all your
            data, including reservations and reviews.
          </p>
        </section>

        <section>
          <h2>3. Booking Policies</h2>
          <ul>
            <li>Bookings require admin approval and a down payment.</li>
            <li>
              Cancellations are allowed only before a down payment is made.
            </li>
            <li>
              No-shows or late check-ins result in the forfeiture of the down
              payment.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Payments and Refunds</h2>
          <p>
            Payments are handled outside the platform via Facebook Messenger,
            GCash, credit cards, or other transfer services.
          </p>
          <p>
            Down payments are generally non-refundable unless discussed with the
            admin.
          </p>
        </section>

        <section>
          <h2>5. User Responsibilities</h2>
          <p>Users must:</p>
          <ul>
            <li>Provide accurate information.</li>
            <li>Follow accommodation rules.</li>
            <li>Avoid fraudulent bookings, bots, and DDoS attacks.</li>
          </ul>
        </section>

        <section>
          <h2>6. Liability and Disclaimers</h2>
          <p>
            <strong>e-haven</strong> is liable for incorrect listings, booking
            errors, and disputes. However, we are not responsible for
            third-party payment failures or website downtime.
          </p>
        </section>

        <section>
          <h2>7. Intellectual Property</h2>
          <p>
            All content, logos, and branding belong to <strong>e-haven</strong>.
            Unauthorized use is prohibited.
          </p>
        </section>

        <section>
          <h2>8. Communication and Dispute Resolution</h2>
          <p>
            We communicate via email, phone, and social media. Users should
            ensure their contact details are up to date.
          </p>
        </section>

        <section>
          <h2>9. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of the
            Philippines.
          </p>
        </section>

        <section>
          <h2>10. Changes to Terms</h2>
          <p>
            These terms may be updated periodically. The &quot;Updated At&quot;
            label will reflect any changes.
          </p>
        </section>

        <p>
          By using <strong>e-haven</strong>, you agree to these Terms and
          Conditions. If you have any questions, please contact support.
        </p>
      </div>
    </main>
  )
}
