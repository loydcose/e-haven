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
        <h1>E-haven Privacy Policy</h1>
        <i>Updated: March 27, 2025</i>

        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>e-haven</strong>, the official online booking
          platform for <strong>Haven Nature&apos;s Resort</strong>. Your privacy
          is important to us. This Privacy Policy explains how we collect, use,
          store, and protect your personal data when using our platform. By
          accessing <strong>e-haven</strong>, you agree to the terms outlined in
          this policy.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Birthday</li>
          <li>Address</li>
        </ul>

        <h3>Non-Personal Information</h3>
        <ul>
          <li>Cookies (for session tracking and token validation)</li>
        </ul>
        <p>
          We do <strong>not</strong> collect IP addresses, browsing behavior, or
          any other non-personal data beyond cookies.
        </p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>
            <strong>Processing Bookings</strong> - Some booking details, such as
            price calculations, may depend on user information (e.g., age).
          </li>
          <li>
            <strong>Account Management</strong> - Verifying email addresses,
            sending account-related notifications, and handling password resets.
          </li>
          <li>
            <strong>Customer Support</strong> - Assisting users with account or
            booking-related concerns.
          </li>
          <li>
            <strong>Future Analytics and Improvements</strong> - If we implement
            analytics, user data may help improve platform performance and user
            experience.
          </li>
        </ul>

        <h2>4. Data Sharing and Third-Party Services</h2>
        <p>
          We <strong>do not</strong> sell or share user data with third parties
          except for the following:
        </p>
        <ul>
          <li>
            <strong>Email Services</strong> - We use external email services
            like <strong>Resend</strong> to send verification emails, password
            reset emails, and other notifications. Only email addresses are
            shared with this service.
          </li>
        </ul>
        <p>
          We <strong>do not</strong> use third-party tracking services like
          Google Analytics or Facebook Pixel.
        </p>

        <h2>5. Data Storage and Security</h2>
        <ul>
          <li>
            User data is securely stored in <strong>MongoDB</strong>, a secure
            and reliable database.
          </li>
          <li>
            Passwords are <strong>hashed</strong> to enhance security and
            prevent unauthorized access.
          </li>
          <li>
            We implement security measures to prevent unauthorized access, data
            breaches, or misuse of personal information.
          </li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          User data is retained as long as the <strong>e-haven</strong> platform
          is operational. If the website shuts down, user data may be deleted.
        </p>

        <h2>7. User Rights and Control</h2>
        <ul>
          <li>
            <strong>Access and Deletion</strong> - Users can request access to
            their data or request its deletion at any time through account
            settings.
          </li>
          <li>
            <strong>Email Communications</strong> - Users can opt out of
            receiving marketing or promotional emails. However, system-related
            notifications (e.g., password reset emails) will still be sent when
            necessary.
          </li>
        </ul>

        <h2>8. Cookies and Tracking Technologies</h2>
        <p>
          We use <strong>cookies</strong> only for:
        </p>
        <ul>
          <li>
            <strong>Session Tracking</strong> - To maintain user login sessions.
          </li>
          <li>
            <strong>Token Validation</strong> - Ensuring that reset password
            tokens cannot be reused.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> use cookies for personalized ads or
          behavioral tracking.
        </p>

        <h2>9. Legal Compliance</h2>
        <p>
          We comply with the <strong>Philippine Data Privacy Act</strong>,
          ensuring that user data is handled responsibly and securely.
        </p>

        <h2>10. Changes to this Privacy Policy</h2>
        <p>
          This Privacy Policy may be updated periodically. The{" "}
          <strong>“updated at”</strong> label on this page will indicate when
          changes are made. Users are encouraged to review this page regularly
          for updates.
        </p>
        <p>
          By using <strong>e-haven</strong>, you acknowledge that you have read,
          understood, and agree to this Privacy Policy. If you have any
          questions, please contact our support team.
        </p>
      </div>
    </main>
  )
}
