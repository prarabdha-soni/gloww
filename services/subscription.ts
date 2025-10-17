import AsyncStorage from '@react-native-async-storage/async-storage';

export type PlanId = 'free' | 'gloww_plus' | 'gloww_pro';

export interface Plan {
  id: PlanId;
  title: string;
  priceLabel: string;
  benefits: string[];
  dailyCaps: {
    lessons: number | 'unlimited';
    quizzes: number | 'unlimited';
  };
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: 'free',
    title: 'Free',
    priceLabel: '₹0',
    benefits: [
      '3 lessons/day',
      'Basic cycle & hormone info',
      'Daily Glow Quiz (1/day)',
      'Glow Score tracker',
    ],
    dailyCaps: { lessons: 3, quizzes: 1 },
  },
  gloww_plus: {
    id: 'gloww_plus',
    title: 'Gloww+',
    priceLabel: '₹499/month',
    benefits: [
      'Unlimited lessons & quizzes',
      'AI Glow Coach',
      'Personalized hormone–skin plan',
      'Nutrition guides & reports',
    ],
    dailyCaps: { lessons: 'unlimited', quizzes: 'unlimited' },
  },
  gloww_pro: {
    id: 'gloww_pro',
    title: 'Gloww Pro',
    priceLabel: '₹1499 / 3 months',
    benefits: [
      'Includes Gloww+ benefits',
      '1:1 virtual consultation',
      'Couples plan options',
      'Premium challenges & rewards',
    ],
    dailyCaps: { lessons: 'unlimited', quizzes: 'unlimited' },
  },
};

const STORAGE_KEY = 'gloww.active_plan';

export async function getActivePlanId(): Promise<PlanId> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (stored === 'gloww_plus' || stored === 'gloww_pro' || stored === 'free') return stored;
  return 'free';
}

export async function setActivePlanId(planId: PlanId): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, planId);
}

export async function getActivePlan(): Promise<Plan> {
  const id = await getActivePlanId();
  return PLANS[id];
}


