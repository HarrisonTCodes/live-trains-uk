import toTitleCase from '@/app/utils/toTitleCase';
import Notice from '../notice/Notice';

export default async function AlertsSection() {
  const alerts = await fetch('https://www.nationalrail.co.uk/nreapi/incidents/alerts/', {
    cache: 'no-cache',
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));

  if (alerts) {
    //  There are alerts
    if (alerts.length > 0) {
      return alerts.map((alert: { name: string; summary: string }, index: number) => (
        <Notice
          key={`alert-${index}`}
          notice={toTitleCase(alert.name.replaceAll('-', ' '))}
          description={alert.summary}
          status="alert"
        />
      ));
      // There are no alerts
    } else {
      return (
        <Notice
          notice="No alerts"
          description="No alerts or disruptions at the moment."
          status="success"
        />
      );
    }
    // There was an error getting alerts
  } else {
    return (
      <Notice
        notice="Error"
        description="There was an error trying to retrieve alerts and disruptions."
        status="fail"
      />
    );
  }
}
