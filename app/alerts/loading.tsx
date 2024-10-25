import PageHeading from '../components/page-heading/PageHeading';
import Skeletons from '../components/skeletons/Skeletons';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Alerts and Disruptions" backEnabled={false} />
      <Skeletons />
    </main>
  );
}
