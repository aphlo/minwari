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
  if (typeof window === "undefined") return [];

  try {
    const json = localStorage.getItem(RECENT_GROUPS_KEY);
    if (!json) return [];

    return JSON.parse(json) as RecentGroup[];
  } catch (e) {
    console.error("Failed to parse recent groups", e);
    return [];
  }
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
