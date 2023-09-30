"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { User } from "@supabase/supabase-js"
import Image from "next/image"
import SignOutButton from "./Signout"

export function NavDropdown({ user }: { user: User }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className='flex items-center gap-2'>
              <Image src={user.user_metadata.avatar_url} className='rounded-full' alt='user-profile-picture' width={30} height={30} />
              {user.user_metadata.name.length >= 16 ? `${user.user_metadata.name.substring(0, 15)}...` : `${user.user_metadata.name}`}
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-6 md:w-[400px] lg:w-[200px] lg:grid-cols-1">
              <SignOutButton />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
