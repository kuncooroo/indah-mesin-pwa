const STORAGE_KEY = "industrialx_rfq_history";

export type RfqHistoryEntry = {
  number: string;
  companyName: string;
  itemCount: number;
  status: string;
  submittedAt: string;
};

function readHistory(): RfqHistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RfqHistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(entries: RfqHistoryEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getRfqHistory(): RfqHistoryEntry[] {
  return readHistory();
}

export function addRfqToHistory(entry: RfqHistoryEntry) {
  const current = readHistory().filter((item) => item.number !== entry.number);
  writeHistory([entry, ...current]);
}

export function updateRfqHistoryStatus(number: string, status: string) {
  writeHistory(
    readHistory().map((item) =>
      item.number === number ? { ...item, status } : item,
    ),
  );
}
