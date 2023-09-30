"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import AuthUI from "@/components/web/AuthUI"
import { Button } from "@/components/ui/button"
import { useState } from "react"
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"

export default function AuthenticationPage() {
  const [login, setLogin] = useState<boolean>(true);
  return (
    <>
      <Button
      variant="ghost"
        onClick={() => {setLogin(!login)}}
        className={cn(
          // buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        { login ? "Create an Account" : "Login" }
      </Button>
      <div className="flex-col my-auto items-center justify-center">
        <div className="container mx-auto my-auto">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {
                    login ? "Login your Account" : "Create an Account"
                  }
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create/Login to your account to continue using the features of FusionClips AI
                </p>
              </div>
              {/* <UserAuthForm /> */}
              <AuthUI />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}