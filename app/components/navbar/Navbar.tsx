import NavbarButton from "./NavbarButton";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-2 flex justify-between items-center z-10 bg-blue-800">
      <h1 className="text-2xl text-white font-medium">Live Trains UK</h1>
      <section className="flex gap-8">
        <NavbarButton href="/">Live Trains</NavbarButton>
        <NavbarButton href="/my-journeys">My Journeys</NavbarButton>
        <NavbarButton href="/account">Account</NavbarButton>
      </section>
    </nav>
  )
}