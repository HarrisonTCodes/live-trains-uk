import { FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6';
import AlertInfo from '../components/alert-info/AlertInfo';
import PageHeading from '../components/page-heading/PageHeading';

export default async function AlertsPage() {
  const alerts = await fetch('https://www.nationalrail.co.uk/nreapi/incidents/alerts/', {
    cache: 'no-cache',
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Alerts and Disruptions" backEnabled={false} />
      {alerts ? (
        alerts.length > 0 ? (
          alerts.map((alert: { name: string; summary: string }, index: number) => (
            <AlertInfo key={`alert${index}`} station={alert.name} description={alert.summary} />
          ))
        ) : (
          <section className="flex flex-col items-center">
            <h2 className="flex items-center gap-2 text-center text-2xl font-medium text-green-700">
              <FaCircleCheck /> No alerts
            </h2>
            <p className="px-2 text-center text-lg text-green-700">
              No alerts or disruptions at the moment
            </p>
          </section>
        )
      ) : (
        // If there was an error
        <section className="flex flex-col items-center">
          <h2 className="flex items-center gap-2 text-2xl font-medium text-red-700">
            <FaTriangleExclamation /> Error
          </h2>
          <p className="px-2 text-center text-lg text-red-700">
            There was an error trying to retrieve alerts and disruptions
          </p>
        </section>
      )}
    </main>
  );
}
