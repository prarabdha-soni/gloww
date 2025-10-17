import AsyncStorage from '@react-native-async-storage/async-storage';
import { getActivePlan } from './subscription';

const STORAGE = {
  points: 'gloww.points',
  lastActiveDate: 'gloww.last_active_date',
  streak: 'gloww.streak',
  counts: 'gloww.daily_counts',
};

type DailyCounts = { date: string; lessons: number; quizzes: number };

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getPoints(): Promise<number> {
  const stored = await AsyncStorage.getItem(STORAGE.points);
  return stored ? parseInt(stored, 10) : 0;
}

export async function addPoints(pts: number): Promise<number> {
  const current = await getPoints();
  const next = current + pts;
  await AsyncStorage.setItem(STORAGE.points, String(next));
  return next;
}

export async function getStreak(): Promise<number> {
  const s = await AsyncStorage.getItem(STORAGE.streak);
  return s ? parseInt(s, 10) : 0;
}

export async function touchDailyStreak(): Promise<number> {
  const last = await AsyncStorage.getItem(STORAGE.lastActiveDate);
  const t = today();
  let streak = await getStreak();
  if (last === t) return streak;
  if (last) {
    const prev = new Date(last);
    const curr = new Date(t);
    const diff = (Number(curr) - Number(prev)) / (1000 * 60 * 60 * 24);
    if (diff <= 1.5) streak += 1; else streak = 1;
  } else {
    streak = 1;
  }
  await AsyncStorage.setItem(STORAGE.streak, String(streak));
  await AsyncStorage.setItem(STORAGE.lastActiveDate, t);
  return streak;
}

async function readCounts(): Promise<DailyCounts> {
  const raw = await AsyncStorage.getItem(STORAGE.counts);
  const t = today();
  if (raw) {
    const data: DailyCounts = JSON.parse(raw);
    if (data.date === t) return data;
  }
  const fresh: DailyCounts = { date: t, lessons: 0, quizzes: 0 };
  await AsyncStorage.setItem(STORAGE.counts, JSON.stringify(fresh));
  return fresh;
}

async function writeCounts(data: DailyCounts) {
  await AsyncStorage.setItem(STORAGE.counts, JSON.stringify(data));
}

export async function canStart(type: 'lesson' | 'quiz'): Promise<{ allowed: boolean; reason?: string }>{
  const plan = await getActivePlan();
  const counts = await readCounts();
  if (type === 'lesson') {
    if (plan.dailyCaps.lessons === 'unlimited') return { allowed: true };
    if (counts.lessons < plan.dailyCaps.lessons) return { allowed: true };
    return { allowed: false, reason: 'Daily lesson limit reached' };
  } else {
    if (plan.dailyCaps.quizzes === 'unlimited') return { allowed: true };
    if (counts.quizzes < plan.dailyCaps.quizzes) return { allowed: true };
    return { allowed: false, reason: 'Daily quiz limit reached' };
  }
}

export async function recordCompleted(type: 'lesson' | 'quiz'): Promise<void> {
  const counts = await readCounts();
  if (type === 'lesson') counts.lessons += 1; else counts.quizzes += 1;
  await writeCounts(counts);
  await touchDailyStreak();
}


