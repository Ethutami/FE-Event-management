import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="check-email">
      <h1>Check Your Email</h1>
      <p>We&apos;ve sent a verification link to your email.</p>
      <p>
        Didn&apos;t receive it?{" "}
        <a href="/resend-verification">Resend verification email</a>
      </p>
      <Link href="/login">Back to Login</Link>
    </div>
  );
}
