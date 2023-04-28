"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface NavigationItemsProps {
  className?: string;
}

export const NavigationItems = ({ className }: NavigationItemsProps) => {
  const pathname = usePathname();
  const classNames = className ?? "";

  const activeClasses = "border-b-2 border-black";

  return (
    <ul className={`flex flex-col md:flex-row items-center gap-4 ${classNames}`}>
      <li>
        <Link
          className={pathname === "/" || pathname?.startsWith("/project/")
            ? activeClasses
            : undefined}
          href="/">Work</Link
        >
      </li>
      <li>
        <Link
          className={pathname?.startsWith("/contact") ? activeClasses : undefined}
          href="/contact">Contact</Link
        >
      </li>
    </ul>
  )
}
