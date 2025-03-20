export function EmailTemplate({
  verificationLink,
  tokenExpiration,
}: {
  verificationLink: string
  tokenExpiration: string
}) {
  return (
    <div>
      <h2>Email Verification Request</h2>
      <p>
        Click the link below to verify your email. This link will expire in{" "}
        {tokenExpiration}.
      </p>
      <a
        href={verificationLink}
        style={{ color: "blue", textDecoration: "underline" }}
      >
        Verify my email
      </a>
    </div>
  )
}
