/** Shared, editable content for the HumAIne site. */

/** Country-of-residence options for the sign form (demographics). */
export const COUNTRIES: string[] = [
  "Malaysia", "Singapore", "Indonesia", "Thailand", "Philippines", "Vietnam",
  "Brunei", "Cambodia", "Laos", "Myanmar",
  "Australia", "New Zealand",
  "China", "Hong Kong", "Taiwan", "Japan", "South Korea", "India", "Pakistan",
  "Bangladesh", "Sri Lanka", "Nepal",
  "United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile",
  "Colombia", "Peru",
  "United Kingdom", "Ireland", "France", "Germany", "Spain", "Portugal",
  "Italy", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden",
  "Norway", "Denmark", "Finland", "Poland", "Czechia", "Greece", "Hungary",
  "Romania", "Ukraine", "Russia", "Turkey",
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman",
  "Israel", "Egypt", "Morocco", "Nigeria", "Kenya", "Ghana", "South Africa",
  "Ethiopia", "Tanzania",
  "Other",
];

export const FOUNDING_MEMBERS: string[] = [
  "Arifah Sharifuddin",
  "Ashvin Praveen",
  "Aster Wei",
  "Brendan Beh",
  "Carl Fernando",
  "Chang Yin Jue",
  "Chong Theng Hui",
  "Dzaharudin Mansor",
  "Fathy Rashad",
  "Lizzie Tan",
  "Marques Menon",
  "Matthieu Pujol",
  "Muhundhan Kamarapullai",
  "Murali Raman",
  "Ng Wan Peng",
  "Shawn D'Cotta",
  "Sumitra Nair",
  "Tengku Hafiz",
  "Wei Chuan Beng",
];

export const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "WhatsApp Community", href: "#" },
];

/** The four core values: left (what we value more) over right. */
export const VALUES = [
  { left: "Purposeful Use", right: "Passive Consumption", color: "amber" },
  { left: "Active Thinking", right: "Replacement of Thinking", color: "moss" },
  { left: "Human Agency", right: "Total Trust on Algorithms", color: "terracotta" },
  { left: "Deeper Connection", right: "Efficiency-at-all-costs", color: "rose" },
];

export type Principle = {
  title: string;
  band: "amber" | "moss" | "terracotta" | "rose";
  points: string[];
};

export const PRINCIPLES: Principle[] = [
  {
    title: "Purposeful Use",
    band: "amber",
    points: [
      "Welcome AI into work and life with curiosity about how it can yield long-term benefit for self and the collective.",
      "Apply AI to enhance human potential, as an extension of human intelligence, not a replacement for it.",
      "Exercise judgement on when to use or not use AI, based on impact on self, society, and planet.",
    ],
  },
  {
    title: "Active Thinking",
    band: "moss",
    points: [
      "Define the objective and outcome first, so thinking stays rooted in human intention, not AI suggestions.",
      "Craft high-quality instructions to obtain output aligned to human goals and prevent the creation of “AI slop”.",
      "Investigate how AI arrived at an output and refuse what you can’t make sense of; favour “glass box” models.",
    ],
  },
  {
    title: "Human Agency",
    band: "terracotta",
    points: [
      "Build in human oversight, especially for high-risk automations, to bridge AI calculations with real-world consequences.",
      "Exercise discretion when output feels unkind, unwise, or misaligned; listen to intuition for ethical and emotional depth.",
      "Take ownership of AI-assisted output as if you signed your name on it, supported by others’ right to inspect how it was made.",
    ],
  },
  {
    title: "Deeper Connection",
    band: "rose",
    points: [
      "Protect time and space to be \"AI-free\", allowing for deep reflection and strategic thinking.",
      "Seek direct, first-hand experiences with people and places, beyond virtual ones.",
      "Nurture what makes you uniquely human: higher-order thinking, creative expression, and connecting through emotion.",
    ],
  },
];
