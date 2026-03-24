export const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const icons = {
  dashboard: "M3 9l9-7 9 7v11...",
  doctors: "M20 21v-2a4 4 0 00-4-4...",
  tools: "M14.7 6.3a1 1 0 000 1.4...",
  appointments: "M8 6h13...",
  settings: "M12 15a3 3 0 100-6...",
  plus: "M12 5v14 M5 12h14",
  close: "M18 6L6 18 M6 6l12 12",
  search: "M21 21l-6-6...",
  bell: "M18 8A6 6 0 006 8...",
  edit: "M11 4H4...",
  trash: "M3 6h18...",
};