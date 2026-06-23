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
  "Aster Wei Su Hwa",
  "Chang Yin Jue",
  "Wei Chuan Beng",
  "Sumitra Nair",
  "Muhundhan Kamarapullai",
  "Murali Raman",
  "Chong Theng Hui",
  "Ng Wan Peng",
  "Dzaharudin Mansor",
  "Matthieu Pujol",
  "Marques Menon",
  "Carl Fernando",
  "Fathy Rashad",
  "Tengku Hafiz",
  "Shawn D'Cotta",
  "Brendan Beh",
  "Ashvin Praveen",
  "Arifah Sharifuddin",
  "Mohd Naz'ri Mahrin",
];

export const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "WhatsApp Community", href: "#" },
];

/** The four core values: left (what we value more) over right. */
export const VALUES = [
  { left: "Purposeful Use", right: "Passive Consumption" },
  { left: "Active Thinking", right: "Replacement of Thinking" },
  { left: "Human Agency", right: "Total Trust on Algorithms" },
  { left: "Deeper Connection", right: "Efficiency-at-all-costs" },
];

export type Principle = {
  title: string;
  band: "blue" | "green" | "purple" | "cream";
  points: string[];
};

export const PRINCIPLES: Principle[] = [
  {
    title: "Purposeful Use",
    band: "cream",
    points: [
      "Welcome AI into work & life with curiosity of how to use it to yield long-term benefit for self and the collective.",
      "Use AI to enhance human potential; utilise AI as an extension to human intelligence and capabilities, not to replace it altogether.",
    ],
  },
  {
    title: "Active Thinking",
    band: "blue",
    points: [
      "Clarify your objective and outcome first to ensure initial thinking is rooted in human intention, not AI suggestions.",
      "Focus on high-quality prompting to obtain desired AI output, prioritising for quality over quantity of prompts, and preventing the creation of “AI slop”.",
      "Ask AI to explain its reasoning and research further if you don’t understand or disagree with its underlying logic; favour Explainable AI or “glass box” models.",
      "Optimise for AI’s energy footprint by selectively using AI for positively value-creating activities, and whenever possible, choose AI models which are more energy efficient.",
    ],
  },
  {
    title: "Human Agency",
    band: "green",
    points: [
      "Keep humans in the loop especially for high-risk automations to bridge AI calculations with real-world consequences.",
      "Listen to your intuition while being mindful of bias, exercise the human \"veto\" when AI output feels unkind, unwise or misaligned with human goals.",
      "Take ownership of AI-assisted work as if you signed your name on it, supported by the right to inspect how it was made.",
    ],
  },
  {
    title: "Deeper Connection",
    band: "purple",
    points: [
      "Keep communication “human” for situations requiring higher levels of empathy; be present for the people, while preparations can be AI-assisted.",
      "Seek direct, first-hand experiences with people and places to build a realistic understanding beyond virtual experiences.",
      "Allocate time and space to be \"AI-free\", allowing for deep reflection and strategic thinking.",
    ],
  },
];
