export default function TrainsPage({ searchParams }: { searchParams: {from: string, to: string} }) {
  return (
    <main>
      <h1>Trains</h1>
      <p>From {searchParams.from} to {searchParams.to}</p>
    </main>
  )
}