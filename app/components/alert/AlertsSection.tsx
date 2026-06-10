import getAlerts from '@/app/utils/getAlerts';
import Notice from '../notice/Notice';
import { Alert } from '@/app/types/app';
import toTitleCase from '@/app/utils/toTitleCase';

export default async function AlertsSection({ station }: { station: string }) {
  const alerts = await getAlerts(station);

  if (alerts && alerts.length > 0) {
    return alerts.map((alert: Alert, index: number) => (
      <Notice
        key={index}
        notice={`${alert.severity !== 'Normal' ? alert.severity : ''} Alert`}
        status={alert.severity === 'Minor' || alert.severity === 'Normal' ? 'warning' : 'alert'}
      >
        {alert.message}
      </Notice>
    ));
  } else {
    return (
      <Notice notice="No alerts" status="success">
        There are currently no alerts or disruptions affecting {toTitleCase(station)}.
      </Notice>
    );
  }
}
