"use client"

import React, { useState } from 'react'
import { NavigationItems } from './NavigationItems'
import { SocialMediaLinks } from './SocialMediaLinks'
import Link from 'next/link'
import { BurgerMenuToggle } from './icons/BurgerMenuToggle'

export const Navbar = () => {
  const [navigationShown, setNavigationShown] = useState(false);

  const burgerMenuClicked = () => {
    setNavigationShown(!navigationShown);
  }

  return (
    <nav className="text-xl flex items-baseline w-full gap-12 mb-14 md:mb-28">
      <div className="flex justify-between w-full md:w-auto">
        <Link className="text-4xl" href="/">Alice Collins</Link>
        <div className="ml-auto md:hidden" onClick={burgerMenuClicked}>
          <BurgerMenuToggle />
        </div>
      </div>
      <div
        className={`${navigationShown ? "" : "hidden overflow-hidden"}md:hidden pt-24 top-0 left-0 absolute w-full h-screen pointer-events-none z-10`}
        id="burger-menu"
      >
        <div
          className="bg-white flex flex-col gap-6 items-center h-full pointer-events-auto"
        >
          <NavigationItems />
          <div className="flex gap-3 mt-auto mb-8">
            <SocialMediaLinks />
          </div>
        </div>
        <div className="top-0 left-0 bg-white h-screen"></div>
      </div>
      <NavigationItems className="hidden md:flex" />
      <div className="gap-3 ml-auto hidden md:flex">
        <SocialMediaLinks />
      </div>
    </nav >
  )
}
