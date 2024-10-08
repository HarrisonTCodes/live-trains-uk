import NavbarButton from "./NavbarButton";
import { FaBookmark, FaUser, FaTrain, FaBars } from "react-icons/fa";

const buttonData = [
  {label: "Live Trains", href: "/", icon: <FaTrain size={24} color="ffffff" className="text-white" />},
  {label: "My Journeys", href: "/my-journeys", icon: <FaBookmark size={24} color="ffffff" className="text-white" />},
  {label: "Account", href: "/account", icon: <FaUser size={24} color="ffffff" className="text-white" />}
] 

export default function Navbar() {
  return (
    <nav className="w-full h-14 px-4 flex justify-between items-center z-10 bg-blue-800">
      <h1 className="text-2xl text-white font-medium">Live Trains UK</h1>
      <section className="flex gap-8">
        {buttonData.map((data) => (
          <NavbarButton href={data.href}>{data.icon} {data.label}</NavbarButton>
        ))}
        <button className="md:hidden">
          <FaBars size={32} color="ffffff" className="text-white" />
        </button>
      </section>
    </nav>
  )
}