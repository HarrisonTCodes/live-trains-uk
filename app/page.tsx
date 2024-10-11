import Search from './components/search/Search';

export default function LiveTrainsPage() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-medium text-blue-900">Get Live Departures</h1>
      <section className="flex flex-col gap-4 md:flex-row">
        <Search />
        <Search />
      </section>
    </main>
  );
}
