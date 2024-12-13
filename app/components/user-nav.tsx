"use client";

import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "./user-avatar"
import { SignOut } from "../utils/authActions";
import { Button } from "@/components/ui/button";
import CartNav from "./cart-nav";

const UserNav = () => {
  return (
    <div className="flex justify-center ">
      <CartNav />
      <DropdownMenu>
        <DropdownMenuTrigger><UserAvatar /></DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-center justify-center mr-2">
          <DropdownMenuLabel className="text-lg">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="text-lg">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="destructive" size="sm" onClick={SignOut} className="text-lg">
              SignOut
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserNav
