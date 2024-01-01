"use client";
import Button from "@/components/Button";
import { signinAction } from "@/lib/actions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import GithubSigninButton from "./GithubSigninButton";

export default function SigninPage() {
  const [error, dispatch] = useFormState(signinAction, undefined);

  return (
    <div className="max-w-xs p-4 shadow rounded border prose">
      <h1>Sign In</h1>
      <form action={dispatch} className="flex flex-col gap-2">
        {error && (
          <span className="bg-red-100 text-red-500 w-fit px-2 rounded">
            {error}
          </span>
        )}
        <label>
          E-mail
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            defaultValue="bartender@example.com"
            className="w-full rounded border-[#e5e7eb]"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            defaultValue="glassofgod"
            className="w-full rounded border-[#e5e7eb] "
          />
        </label>
        <SigninButton />
      </form>
      <p className="text-center border-b-2 pb-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="hover:underline hover:underline-offset-2 hover:text-blue-500 transition-all"
        >
          Sign Up
        </Link>
      </p>
      <div className="flex flex-col gap-2">
        <GithubSigninButton />
      </div>
    </div>
  );
}

function SigninButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-500"
    >
      Sign In
    </Button>
  );
}
