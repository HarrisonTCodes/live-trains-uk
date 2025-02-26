import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function FooterLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="flex items-center gap-1 text-sm underline"
    >
      {children}
      <ExternalLinkIcon size={14} />
    </Link>
  );
}
