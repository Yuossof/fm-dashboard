import type { Metadata } from "next"

import { getDictionary } from "@/lib/get-dictionary"

import { SignIn } from "@/components/auth/sign-in"

export const metadata: Metadata = {
  title: "Sign In",
}

export default async function SignInPage() {
  const dictionary = await getDictionary("en")

  return <SignIn dictionary={dictionary} />
}
