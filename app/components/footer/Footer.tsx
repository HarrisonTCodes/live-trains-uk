import FooterLink from './FooterLink';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 border-t border-gray-300 bg-stone-100 px-2 py-4">
      {/* Links */}
      <section className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <FooterLink href="https://github.com/HarrisonTCodes/live-trains-uk">
          View the Source Code
        </FooterLink>
        <FooterLink href="https://buymeacoffee.com/harrisontcodes">Buy Me a Coffee</FooterLink>
        <FooterLink href="https://www.raildeliverygroup.com">
          Powered by Rail Delivery Group
        </FooterLink>
        <FooterLink href="https://tfl.gov.uk/info-for/open-data-users/our-open-data">
          Powered by TfL Open Data
        </FooterLink>
      </section>

      {/* Attributions */}
      <section className="flex flex-col items-center justify-center gap-4">
        <span className="text-center text-sm text-stone-700">
          Contains OS data © Crown copyright and database rights 2016
        </span>
        <span className="text-center text-sm text-stone-700">
          Contains Geomni UK Map data © and database rights 2019
        </span>
      </section>
    </footer>
  );
}
