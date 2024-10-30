import { FaTriangleExclamation } from 'react-icons/fa6';
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
          <h2 className="text-center text-2xl font-medium text-gray-500">
            No alerts or disruptions at the moment
          </h2>
        )
      ) : (
        // If there was an error
        <h2 className="flex items-center gap-2 text-2xl font-medium text-red-700">
          <FaTriangleExclamation /> There was an error
        </h2>
      )}
    </main>
  );
}
