export function EmailTemplate({
  resetLink,
  tokenExpiration,
}: {
  resetLink: string
  tokenExpiration: string
}) {
  return (
    <div>
      <h2>Password Reset Request</h2>
      <p>
        Click the link below to reset your password. This link will expire in{" "}
        {tokenExpiration}.
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
