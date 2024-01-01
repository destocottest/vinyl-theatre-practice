"use server";
import { AuthError } from "next-auth";
import { signIn, signOut } from "./auth";
import { SignInSchema } from "./schemas";

export async function signinAction(
  currentState: string | undefined,
  formData: FormData
) {
  try {
    const parsedFormData = SignInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsedFormData.success) {
      throw new AuthError({
        cause: "Invalid Credentials",
      });
    }

    await signIn("credentials", {
      email: parsedFormData.data.email,
      password: parsedFormData.data.password,
      redirectTo: "/secret",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Oops! Incorrect email or password. Please try again.";
        default:
          return typeof error.cause === "string"
            ? error.cause
            : "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signoutAction() {
  await signOut();
}

export async function signinWithGithub() {
  await signIn("github", { redirectTo: "/secret" });
}
