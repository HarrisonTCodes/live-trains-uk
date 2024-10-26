import Link from 'next/link';

export default function NavbarButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="hidden items-center justify-center gap-2 rounded-xl p-2 font-medium text-white hover:bg-blue-600 active:bg-blue-500 md:flex"
      href={href}
    >
      {children}
    </Link>
  );
}
