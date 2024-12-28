"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Dropdown, DropdownItem } from "@/components/ui/dropdown"

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const portalNavItems = [
  { label: "Team Portal", href: "/team/login" },
  { label: "Admin Portal", href: "/admin/login" },
]

export function NavMenu() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm">
              Portals
            </Button>
          }
          align="end"
        >
          {portalNavItems.map((item) => (
            <DropdownItem key={item.href}>
              <Link href={item.href} className="block w-full">
                {item.label}
              </Link>
            </DropdownItem>
          ))}
        </Dropdown>
      </nav>

      {/* Mobile Navigation */}
      <Dropdown
        trigger={
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        }
        align="end"
        className="w-48"
      >
        {mainNavItems.map((item) => (
          <DropdownItem key={item.href}>
            <Link href={item.href} className="block w-full">
              {item.label}
            </Link>
          </DropdownItem>
        ))}
        <DropdownItem disabled className="font-medium text-sm px-2 py-1.5 text-muted-foreground">
          Portals
        </DropdownItem>
        {portalNavItems.map((item) => (
          <DropdownItem key={item.href}>
            <Link href={item.href} className="block w-full">
              {item.label}
            </Link>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  )
}