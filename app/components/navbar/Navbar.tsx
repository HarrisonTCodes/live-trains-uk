import NavbarButton from "./NavbarButton";
import { FaBookmark, FaUser, FaTrain } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-2 flex justify-between items-center z-10 bg-blue-800">
      <h1 className="text-2xl text-white font-medium">Live Trains UK</h1>
      <section className="flex gap-8">
        <NavbarButton href="/">
          <FaTrain size={24} color="ffffff" className="text-white" />
          Live Trains
        </NavbarButton>
        <NavbarButton href="/my-journeys">
          <FaBookmark size={24} color="ffffff" className="text-white" />
          My Journeys
        </NavbarButton>
        <NavbarButton href="/account">
          <FaUser size={24} color="ffffff" className="text-white" />
          Account
        </NavbarButton>
      </section>
    </nav>
  )
}