import { FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6';
import AlertInfo from '../components/alert-info/AlertInfo';
import PageHeading from '../components/page-heading/PageHeading';
import Notice from '../components/notice/Notice';

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
            <AlertInfo key={`alert${index}`} alert={alert.name} description={alert.summary} />
          ))
        ) : (
          <Notice
            notice="No alerts"
            description="No alerts or disruptions at the moment"
            icon={<FaCircleCheck />}
            color="green-700"
          />
        )
      ) : (
        // If there was an error
        <Notice
          notice="Error"
          description="There was an error trying to retrieve alerts and disruptions"
          icon={<FaTriangleExclamation />}
          color="red-700"
        />
      )}
    </main>
  );
}
