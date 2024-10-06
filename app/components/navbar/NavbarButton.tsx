export default function NavbarButton({
  children,
  href
}: {
  children: React.ReactNode,
  href?: string
}) {
  return (
    <button className="text-white font-medium rounded-xl hover:bg-blue-600 p-2">
      <a href={href}>
        {children}
      </a>
    </button>
  )
}