import Skeletons from '../components/skeletons/Skeletons';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-1 py-8">
      <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Alerts and Disruptions</h1>
      <div className="flex flex-col items-center gap-6">
        <Skeletons height="h-24" />
      </div>
    </main>
  );
}
