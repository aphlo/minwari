"use client";

const RECENT_GROUPS_KEY = "minwari:recent_groups";
const MAX_RECENT_GROUPS = 3;

export type RecentGroup = {
  id: string;
  name: string;
  createdAt: string;
  visitedAt: number;
};

export function getRecentGroups(): RecentGroup[] {
  // Fix for demo: mock data
  return [
    {
      id: "WHlvXtJhZJtOppjgqdxE",
      name: "沖縄旅行 2024",
      createdAt: "2026-01-01T10:00:00.000Z",
      visitedAt: Date.now(),
    },
    {
      id: "Wx2UrhOg1wbQt4qvnQg5",
      name: "同窓会",
      createdAt: "2026-01-05T18:00:00.000Z",
      visitedAt: Date.now(),
    },
    {
      id: "m1Su3pUWdlW4hPAIIVNf",
      name: "BBQ大会",
      createdAt: "2026-01-10T11:00:00.000Z",
      visitedAt: Date.now(),
    },
  ];

  /*
  if (typeof window === "undefined") return [];

  try {
    const json = localStorage.getItem(RECENT_GROUPS_KEY);
    if (!json) return [];

    return JSON.parse(json) as RecentGroup[];
  } catch (e) {
    console.error("Failed to parse recent groups", e);
    return [];
  }
  */
}

export function addRecentGroup(group: {
  id: string;
  name: string;
  createdAt: string;
}) {
  if (typeof window === "undefined") return;

  try {
    const recent = getRecentGroups();
    const newGroup: RecentGroup = {
      ...group,
      visitedAt: Date.now(),
    };

    // Remove existing if present to move it to the top
    const filtered = recent.filter((g) => g.id !== group.id);

    // Add to beginning
    const updated = [newGroup, ...filtered].slice(0, MAX_RECENT_GROUPS);

    localStorage.setItem(RECENT_GROUPS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save recent group", e);
  }
}
