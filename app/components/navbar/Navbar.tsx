'use client';
import { useEffect, useRef, useState } from 'react';
import NavbarButton from './NavbarButton';
import { FaBookmark, FaUser, FaTrain, FaBars, FaXmark, FaCircleExclamation } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const buttonData = [
  {
    label: 'Live Trains',
    href: '/',
    icon: <FaTrain />,
  },
  {
    label: 'My Journeys',
    href: '/my-journeys',
    icon: <FaBookmark />,
  },
  {
    label: 'Alerts',
    href: '/alerts',
    icon: <FaCircleExclamation />,
  },
  {
    label: 'Account',
    href: '/account',
    icon: <FaUser />,
  },
];

export default function Navbar() {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const hamburgerMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const menuButtonPressed = (href: string) => {
    router.push(href);
    setHamburgerMenuOpen(false);
  };

  const handleClick = (event: MouseEvent) => {
    if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target as Node)) {
      setHamburgerMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [hamburgerMenuRef]);

  return (
    <nav className="sticky top-0 z-30 flex h-14 w-full items-center justify-between bg-blue-800 px-4">
      {/* App Name */}
      <h1 className="text-2xl font-medium text-white">Live Trains UK</h1>
      {/* Buttons */}
      <section className="flex gap-6">
        {buttonData.map((data) => (
          <NavbarButton href={data.href} key={`${data.label} nav option`}>
            <span className="text-2xl">{data.icon}</span> {data.label}
          </NavbarButton>
        ))}
        {/* Hamburger Button */}
        <button className="md:hidden" onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}>
          {hamburgerMenuOpen ? (
            <FaXmark size={32} className="text-white" />
          ) : (
            <FaBars size={32} className="text-white" />
          )}
        </button>
      </section>
      {/* Hamburger Menu */}
      {hamburgerMenuOpen && (
        <div
          className="absolute right-2 top-16 z-20 flex w-48 cursor-pointer flex-col divide-y divide-stone-300 rounded-lg border border-stone-300 bg-white shadow-xl md:hidden"
          ref={hamburgerMenuRef}
        >
          {buttonData.map((data) => (
            <button
              onClick={() => menuButtonPressed(data.href)}
              className="flex items-center gap-2 px-2 py-2 text-left text-lg font-medium text-stone-600 active:bg-stone-200"
              key={`${data.label} menu option`}
            >
              <span className="text-blue-900">{data.icon}</span> {data.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
