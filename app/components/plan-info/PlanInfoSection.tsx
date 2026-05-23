import getPlans from '@/app/utils/getPlans';
import PlanInfo from './PlanInfo';
import { Plan } from '@/app/interfaces';
import Notice from '../notice/Notice';
import toTitleCase from '@/app/utils/toTitleCase';

export default async function PlanInfoSection({ from, to }: { from: string; to: string }) {
  const plans = await getPlans(from, to);

  if (plans.length > 0) {
    return plans.map((plan: Plan, i: number) => <PlanInfo key={`plan ${i}`} plan={plan} />);
  } else {
    return (
      <Notice notice="No plans">
        There are currently no journey plans between {toTitleCase(from)} and {toTitleCase(to)}.
      </Notice>
    );
  }
}
