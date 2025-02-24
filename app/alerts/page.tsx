import { Suspense } from 'react';
import AlertsSection from '../components/alert/AlertsSection';
import Skeletons from '../components/skeletons/Skeletons';

export default async function AlertsPage() {
  return (
    <main className="flex flex-col items-center gap-4 py-8">
      {/* Heading */}
      <h1 className="text-center text-2xl font-bold text-blue-900">Alerts and Disruptions</h1>

      {/* Alerts */}
      <div className="flex flex-col items-center gap-6">
        <Suspense fallback={<Skeletons height="h-24" />}>
          <AlertsSection />
        </Suspense>
      </div>
    </main>
  );
}
