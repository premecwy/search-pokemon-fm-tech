export const LS_KEY = "pokemon_recent_searches";
export const MAX_RECENTS = 5;

export function loadRecents(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveRecent(term: string): void {
  if (typeof window === "undefined") return;
  const t = term.trim().toLowerCase();
  if (!t) return;

  const current = loadRecents();
  const next = [t, ...current.filter((x) => x !== t)].slice(0, MAX_RECENTS);
  localStorage.setItem(LS_KEY, JSON.stringify(next));
}
