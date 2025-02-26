import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 border-t bg-stone-100 py-4 md:flex-row">
      <Link
        href={'https://www.raildeliverygroup.com/'}
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center gap-1 text-sm underline"
      >
        Powered by Rail Delivery Group
        <ExternalLinkIcon size={14} />
      </Link>
      <Link
        href={'https://github.com/HarrisonTCodes/live-trains-uk'}
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center gap-1 text-sm underline"
      >
        View the Source Code
        <ExternalLinkIcon size={14} />
      </Link>
    </footer>
  );
}
