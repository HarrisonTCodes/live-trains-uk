import FooterLink from './FooterLink';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 border-t border-gray-300 bg-stone-100 py-4 md:flex-row">
      <FooterLink href={'https://www.raildeliverygroup.com'}>
        Powered by Rail Delivery Group
      </FooterLink>
      <FooterLink href={'https://github.com/HarrisonTCodes/live-trains-uk'}>
        View the Source Code
      </FooterLink>
    </footer>
  );
}
