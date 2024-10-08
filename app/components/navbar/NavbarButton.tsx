export default function NavbarButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <button className="hidden rounded-xl p-2 font-medium text-white hover:bg-blue-600 md:block">
      <a href={href} className="flex items-center justify-center gap-2">
        {children}
      </a>
    </button>
  );
}
