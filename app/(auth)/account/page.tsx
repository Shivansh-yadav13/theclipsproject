// import * as React from "react"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select"

// export default function Account() {
//   return (
//     <div className="flex justify-center text-center">
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle>Create/Login Account</CardTitle>
//           <CardDescription>Create/Login to your account to continue using the features of FusionClips AI</CardDescription>
//         </CardHeader>
//         <CardContent>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <p className="text-xs text-muted-foreground">By continuing, you agree to FusionClips&apos;s Term of Service. Read our Privacy Policy</p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import AuthUI from "@/components/web/AuthUI"
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <Link
        href="/examples/authentication"
        className={cn(
          // buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="flex-col my-auto items-center justify-center">
        <div className="container mx-auto my-auto">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
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