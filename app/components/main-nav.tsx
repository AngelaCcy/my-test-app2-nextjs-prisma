"use client"

import { useState } from "react"
// navigation 即是去取Browser上方的網址
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { mainNavLinks, userNavLinks } from "@/constant"



const MainNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathName = usePathname()

  return (
    <div className="flex items-center lg:space-x-6 mx-4">
      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
        <Menu />
      </button>
      <div className={cn(
        "absolute top-full left-0 w-full border bg-gray-100 dark:bg-gray-900",
        "lg:border-none lg:static lg:flex lg:space-x-6",
        menuOpen ? "block" : "hidden"
      )}>
        {
          mainNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              className={cn(
                "block py-2 px-4 text-lg transition-colors flex items-center gap-2",
                pathName === link.url ? "text-black dark:text-white" : "text-muted-foreground"
              )}
            >
              <link.icon />
              {link.title}
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default MainNav
