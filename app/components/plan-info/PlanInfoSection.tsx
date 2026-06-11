import getPlans from '@/app/utils/getPlans';
import PlanInfo from './PlanInfo';
import type { Plan } from '@/app/types/app';
import Notice from '../notice/Notice';
import toTitleCase from '@/app/utils/toTitleCase';
import Link from 'next/link';

export default async function PlanInfoSection({ from, to }: { from: string; to: string }) {
  const plans = await getPlans(from, to);
  const isDirect = plans.some((plan) => plan.legs.length === 1 && plan.legs[0].mode === 'TRAIN');

  if (plans.length > 0) {
    return (
      <>
        {isDirect && (
          <Notice notice="Direct Journeys">
            Plans below include direct journeys. Searching{' '}
            <Link
              className="text-blue-900 underline"
              href={`/trains/${toTitleCase(from)}/${toTitleCase(to)}`}
            >
              live departures between {toTitleCase(from)} and {toTitleCase(to)}
            </Link>{' '}
            provides a more comprehensive view of available journeys with service-level information.
          </Notice>
        )}
        {plans.map((plan: Plan, i: number) => (
          <PlanInfo key={`plan ${i}`} plan={plan} />
        ))}
      </>
    );
  } else {
    return (
      <Notice notice="No plans">
        There are currently no journey plans between {toTitleCase(from)} and {toTitleCase(to)}.
      </Notice>
    );
  }
}
