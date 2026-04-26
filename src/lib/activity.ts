export type ActivityType = "search" | "booking" | "cancel";

export interface AppActivity {
  id: string;
  type: ActivityType;
  module: "flights" | "hotels" | "trains" | "cabs" | "bus" | "holidays";
  summary: string;
  amount?: number;
  createdAt: string;
}

const KEY = "wanderwise_activity_feed";

export function recordActivity(activity: Omit<AppActivity, "id" | "createdAt">) {
  const payload: AppActivity = {
    ...activity,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const current = getActivities();
  const next = [payload, ...current].slice(0, 100);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function getActivities(): AppActivity[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}
