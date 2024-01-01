"use client";
import Button from "@/components/Button";
import { signinAction } from "@/lib/actions";
import { SignUpSchema } from "@/lib/schemas";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const parsedFormData = SignUpSchema.safeParse(Object.fromEntries(formData));

    if (!parsedFormData.success) {
      setError(parsedFormData.error.issues[0].message);
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedFormData.data),
    });

    const json = await res.json();
    if (json.error) setError(json.error);
    if (json.success) signinAction(undefined, formData);

    setSubmitting(false);
  };

  return (
    <div className="max-w-xs p-4 shadow rounded border prose">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {error && (
          <p className="bg-red-100 text-red-500 w-fit px-2 rounded">{error}</p>
        )}
        <label>
          Enter E-mail
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="w-full rounded border-[#e5e7eb]"
          />
        </label>
        <label>
          Choose Display Name
          <input
            type="text"
            placeholder="Create a display name"
            name="display"
            className="w-full rounded border-[#e5e7eb]"
          />
        </label>
        <label>
          Create Password
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="w-full rounded border-[#e5e7eb]"
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            placeholder="Confirm your password"
            name="confirm"
            className="w-full rounded border-[#e5e7eb]"
          />
        </label>
        <Button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-500"
        >
          Sign Up
        </Button>
      </form>
      <p className="text-center">
        Aleady have an account?{" "}
        <Link
          href="/signin"
          className="hover:underline hover:underline-offset-2 hover:text-blue-500 transition-all"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
