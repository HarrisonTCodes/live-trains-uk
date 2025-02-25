import getAlerts from '@/app/utils/getAlerts';
import Notice from '../notice/Notice';
import { Alert } from '@/app/interfaces';
import toTitleCase from '@/app/utils/toTitleCase';

export default async function AlertsSection({ station }: { station: string }) {
  const alerts = await getAlerts(station);

  if (alerts && alerts.length > 0) {
    return alerts.map((alert: Alert, index: number) => (
      <Notice
        key={index}
        notice={`${alert.severity !== 'Normal' ? alert.severity : ''} Alert`}
        description={alert.message}
        status={alert.severity === 'Minor' || alert.severity === 'Normal' ? 'warning' : 'alert'}
      />
    ));
  } else {
    return (
      <Notice
        notice="No alerts"
        description={`There are currently no alerts or disruptions affecting ${toTitleCase(station)}.`}
        status="success"
      />
    );
  }
}
