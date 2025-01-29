import Notice from '../components/notice/Notice';
import toTitleCase from '../utils/toTitleCase';

export default async function AlertsPage() {
  const alerts = await fetch('https://www.nationalrail.co.uk/nreapi/incidents/alerts/', {
    cache: 'no-cache',
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return (
    <main className="flex flex-col items-center gap-4 py-8">
      {/* Heading */}
      <h1 className="text-center text-2xl font-bold text-blue-900">Alerts and Disruptions</h1>

      {/* Alerts */}
      <div className="flex flex-col items-center gap-6">
        {alerts ? (
          alerts.length > 0 ? (
            alerts.map((alert: { name: string; summary: string }, index: number) => (
              <Notice
                key={`alert-${index}`}
                notice={toTitleCase(alert.name.replaceAll('-', ' '))}
                description={alert.summary}
                status="alert"
              />
            ))
          ) : (
            <Notice
              notice="No alerts"
              description="No alerts or disruptions at the moment."
              status="success"
            />
          )
        ) : (
          // If there was an error
          <Notice
            notice="Error"
            description="There was an error trying to retrieve alerts and disruptions."
            status="fail"
          />
        )}
      </div>
    </main>
  );
}
