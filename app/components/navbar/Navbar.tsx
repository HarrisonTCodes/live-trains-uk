'use client';
import { useState } from 'react';
import NavbarButton from './NavbarButton';
import { FaBookmark, FaUser, FaTrain, FaBars, FaXmark } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const buttonData = [
  {
    label: 'Live Trains',
    href: '/',
    icon: <FaTrain size={24} color="ffffff" className="text-white" />,
  },
  {
    label: 'My Journeys',
    href: '/my-journeys',
    icon: <FaBookmark size={24} color="ffffff" className="text-white" />,
  },
  {
    label: 'Account',
    href: '/account',
    icon: <FaUser size={24} color="ffffff" className="text-white" />,
  },
];

export default function Navbar() {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const router = useRouter();

  const menuButtonPressed = (href: string) => {
    router.push(href);
    setHamburgerMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-10 flex h-14 w-full items-center justify-between bg-blue-800 px-4">
      {/* App Name */}
      <h1 className="text-2xl font-medium text-white">Live Trains UK</h1>
      {/* Buttons */}
      <section className="flex gap-8">
        {buttonData.map((data) => (
          <NavbarButton href={data.href} key={`${data.label} nav option`}>
            {data.icon} {data.label}
          </NavbarButton>
        ))}
        {/* Hamburger Button */}
        <button className="md:hidden" onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}>
          {hamburgerMenuOpen ? (
            <FaXmark size={32} color="ffffff" className="text-white" />
          ) : (
            <FaBars size={32} color="ffffff" className="text-white" />
          )}
        </button>
      </section>
      {/* Hamburger Menu */}
      {hamburgerMenuOpen && (
        <div className="absolute right-2 top-16 z-20 flex w-48 cursor-pointer flex-col divide-y-2 divide-stone-300 rounded-xl border-2 border-stone-300 bg-white shadow-xl md:hidden">
          {buttonData.map((data) => (
            <button
              onClick={() => menuButtonPressed(data.href)}
              className="px-2 py-2 text-left text-lg font-medium text-stone-600 active:bg-stone-200"
              key={`${data.label} menu option`}
            >
              {data.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
