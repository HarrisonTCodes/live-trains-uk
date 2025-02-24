import AlertsSection from '@/app/components/alert/AlertsSection';
import Button from '@/app/components/button/Button';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import Notice from '@/app/components/notice/Notice';
import Skeletons from '@/app/components/skeletons/Skeletons';
import { Alert } from '@/app/interfaces';
import getAlerts from '@/app/utils/getAlerts';
import getTime from '@/app/utils/getTime';
import toTitleCase from '@/app/utils/toTitleCase';
import { ArrowLeftIcon } from 'lucide-react';
import { Suspense } from 'react';

export default async function StationAlertsPage(props: { params: Promise<{ station: string }> }) {
  const params = await props.params;
  const parsedStation = decodeURIComponent(params.station).replaceAll('+', ' ').toLowerCase();
  const alerts = await getAlerts(parsedStation);
  const now = getTime();

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">
          Alerts and Disruptions
        </h1>

        {/* Station, last updated and back button */}
        <HeadingWidget
          text={`Alerts and disruptions for ${toTitleCase(parsedStation)}`}
          tag={`Last updated at ${now}`}
        >
          <Button width="w-full md:w-56" back>
            <ArrowLeftIcon /> Back to alerts
          </Button>
        </HeadingWidget>
      </section>

      {/* Alerts */}
      <section className="flex flex-col items-center gap-6">
        <Suspense fallback={<Skeletons height="h-24" />}>
          <AlertsSection station={parsedStation} />
        </Suspense>
      </section>
    </main>
  );
}
