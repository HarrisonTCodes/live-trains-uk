import getPlans from '@/app/utils/getPlans';
import PlanInfo from './PlanInfo';
import { Plan } from '@/app/interfaces';

export default async function PlanInfoSection({ from, to }: { from: string; to: string }) {
  const plans = await getPlans(from, to);

  return plans.map((plan: Plan, index: number) => <PlanInfo key={`plan ${index}`} plan={plan} />);
}
