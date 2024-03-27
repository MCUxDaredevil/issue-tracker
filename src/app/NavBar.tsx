'use client'

import React from 'react'
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import {usePathname} from "next/navigation";


const NavBar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/"
    },
    {
      label: "Issues",
      href: "/issues"
    }
  ]

  const currentPath = usePathname()

  return (
    <nav className="flex space-x-6 border-b mb-6 px-5 py-3 text-2xl items-center justify-between">
      <Link href="/"><FaBug className="size-8"/></Link>
      <ul className="flex space-x-6">
        {links.map(link => {
          return (
            <Link href={link.href} key={link.href} className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-blue-400 transition-colors": true
            })}>
              {link.label}
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavBar;