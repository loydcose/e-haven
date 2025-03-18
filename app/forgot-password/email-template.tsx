export function EmailTemplate({ resetLink }: { resetLink: string }) {
  return (
    <div>
      <h2>Password Reset Request</h2>
      <p>
        Click the link below to reset your password. This link will expire in 5
        minutes.
      </p>
      <a
        href={resetLink}
        style={{ color: "blue", textDecoration: "underline" }}
      >
        Reset Password
      </a>
    </div>
  )
}
