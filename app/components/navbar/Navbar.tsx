"use client";
import { useState } from "react";
import NavbarButton from "./NavbarButton";
import { FaBookmark, FaUser, FaTrain, FaBars } from "react-icons/fa";

const buttonData = [
  {label: "Live Trains", href: "/", icon: <FaTrain size={24} color="ffffff" className="text-white" />},
  {label: "My Journeys", href: "/my-journeys", icon: <FaBookmark size={24} color="ffffff" className="text-white" />},
  {label: "Account", href: "/account", icon: <FaUser size={24} color="ffffff" className="text-white" />}
] 

export default function Navbar() {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)

  return (
    <nav className="w-full h-14 px-4 flex justify-between items-center z-10 bg-blue-800">
      {/* App Name */}
      <h1 className="text-2xl text-white font-medium">Live Trains UK</h1>
      {/* Buttons */}
      <section className="flex gap-8">
        {buttonData.map((data) => (
          <NavbarButton href={data.href} key={`${data.label} nav option`}>{data.icon} {data.label}</NavbarButton>
        ))}
        {/* Hamburger Button */}
        <button className="md:hidden" onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}>
          <FaBars size={32} color="ffffff" className="text-white" />
        </button>
      </section>
      {/* Hamburger Menu */}
      {hamburgerMenuOpen &&
        <div className="flex md:hidden flex-col cursor-pointer absolute w-48 top-16 right-2 border-2 border-stone-300 bg-white rounded-xl divide-y-2 divide-stone-300">
          {buttonData.map((data) => (
            <a href={data.href} className="px-2 py-2 text-lg text-stone-600 font-medium" key={`${data.label} menu option`}>
              {data.label}
            </a>
          ))}
        </div>
      }
    </nav>
  )
}