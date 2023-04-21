import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

interface NavigationItemsProps {
  className?: string;
}

export const NavigationItems = ({ className }: NavigationItemsProps) => {
  const router = useRouter();
  const pathname = router.pathname;
  const classNames = className ?? "";

  const activeClasses = "border-b-2 border-black";

  return (
    <ul className={`flex flex-col md:flex-row items-center gap-4 ${classNames}`}>
      <div>
        <Link
          className={pathname === "/" || pathname.startsWith("/project/")
            ? activeClasses
            : undefined}
          href="/">Work</Link
        >
      </div>
      <div>
        <Link
          className={pathname.startsWith("/contact") ? activeClasses : undefined}
          href="/contact">Contact</Link
        >
      </div>
    </ul>
  )
}
