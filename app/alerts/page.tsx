import AlertInfo from '../components/alert-info/AlertInfo';
import PageHeading from '../components/page-heading/PageHeading';

export default async function AlertsPage() {
  const alerts = await fetch('https://www.nationalrail.co.uk/nreapi/incidents/alerts/').then(
    (response) => response.json(),
  );

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Alerts and Disruptions" backEnabled={false} />
      {alerts.map((alert: { name: string; summary: string }) => (
        <AlertInfo station={alert.name} description={alert.summary} />
      ))}
    </main>
  );
}
