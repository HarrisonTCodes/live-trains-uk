import { FaCircleCheck, FaCircleExclamation, FaTriangleExclamation } from 'react-icons/fa6';
import PageHeading from '../components/page-heading/PageHeading';
import Notice from '../components/notice/Notice';
import toTitleCase from '../utils/toTitleCase';

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
            <Notice
              key={`alert-${index}`}
              notice={toTitleCase(alert.name.replaceAll('-', ' '))}
              description={alert.summary}
              icon={<FaCircleExclamation />}
              color="red-700"
            />
          ))
        ) : (
          <Notice
            notice="No alerts"
            description="No alerts or disruptions at the moment."
            icon={<FaCircleCheck />}
            color="green-700"
          />
        )
      ) : (
        // If there was an error
        <Notice
          notice="Error"
          description="There was an error trying to retrieve alerts and disruptions."
          icon={<FaTriangleExclamation />}
          color="red-700"
        />
      )}
    </main>
  );
}
