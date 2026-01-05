const chipColors = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
] as const;

export type ChipColor = (typeof chipColors)[number];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getMemberChipColor(memberName: string): ChipColor {
  const hash = hashString(memberName);
  return chipColors[hash % chipColors.length];
}
