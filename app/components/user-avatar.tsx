"use client"

import {UserCircle2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { auth } from "@/auth"

const UserAvatar = () => {
  // const pathName = usePathname()
  
  return (
    <div className="flex items-center">
      <UserCircle2 className="mx-auto w-8 h-8"/>
    </div>
  )
}

export default UserAvatar
