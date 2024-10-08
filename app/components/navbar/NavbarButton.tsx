export default function NavbarButton({
  children,
  href
}: {
  children: React.ReactNode,
  href?: string
}) {
  return (
    <button className="text-white font-medium rounded-xl hover:bg-blue-600 p-2 hidden md:block">
      <a href={href} className="flex items-center justify-center gap-2">
        {children}
      </a>
    </button>
  )
}