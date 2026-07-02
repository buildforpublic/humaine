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

export type FoundingMember = {
  /** Display name, including honorific where used. */
  name: string;
  /** Short bio, one sentence. */
  oneLiner: string;
  /** Domain / area-of-work tag, shown as a pill. */
  domain: string;
  /**
   * Photo filename (without extension) in `/public/team/`.
   * When the file exists we render the headshot; otherwise a monogram
   * fallback is shown, so the section renders cleanly either way.
   */
  slug: string;
};

// Order: founders first (Aster, Yin Jue), then honoured dignitaries
// (Dato' Wei, Dr Sumitra, Dr Dzaharudin), then the rest of the founding
// cohort alphabetically.
export const FOUNDING_MEMBERS: FoundingMember[] = [
  {
    name: "Aster Wei Su Hwa",
    domain: "Neuroscientist & education entrepreneur",
    oneLiner:
      "Founder of the HumAIne Movement; neuroscientist turned entrepreneur and Co-Founder of Otti NeuroLearning Institute, bridging brain science, business and technology so that AI enhances human intelligence rather than diminishing it.",
    slug: "aster-wei-su-hwa",
  },
  {
    name: "Chang Yin Jue",
    domain: "Psycholinguist & AI Educator",
    oneLiner:
      "Co-initiator of the HumAIne Movement; Cambridge-trained psycholinguist and Co-Founder of Otti NeuroLearning Institute, working on the science of human thought and language to cultivate cognitively resilient minds in the AI era.",
    slug: "chang-yin-jue",
  },
  {
    name: "Dato' Wei Chuan Beng",
    domain: "Tech entrepreneur & industry pioneer",
    oneLiner:
      "30-year technopreneur and founder of REDtone (listed 2004); contributor to Malaysia's digital ecosystem and national policy through the National Digital Economy and 4IR Council, PIKOM, National Productivity Council and more.",
    slug: "wei-chuan-beng",
  },
  {
    name: "Dr Sumitra Nair",
    domain: "Sustainability & transformation advisor",
    oneLiner:
      "Former MDEC EXCO and Senior VP; ex-DiGi and Telekom Malaysia; two decades of leadership in digital transformation, talent and sustainability; serving various advisory boards.",
    slug: "sumitra-nair",
  },
  {
    name: "Dr Dzaharudin Mansor",
    domain: "AI governance & cybersecurity veteran",
    oneLiner:
      "Technology leader with 35+ years' experience and senior roles across Microsoft and AWS; a champion of AI governance, cybersecurity and secure digital transformation.",
    slug: "dzaharudin-mansor",
  },
  {
    name: "Arifah Sharifuddin",
    domain: "Digital policy & inclusion leader",
    oneLiner:
      "Institute Director at Tech For Good Institute; drawing on a background in global banking, philanthropy and tech policy to champion inclusive digital development across Southeast Asia.",
    slug: "arifah-sharifuddin",
  },
  {
    name: "Ashvin Praveen",
    domain: "AI founder & community builder",
    oneLiner:
      "Co-Founder and CEO of Cleve.ai, an Antler-backed AI startup; a grassroots builder driving regional social mobility through initiatives such as Malaysia's National AI Competition.",
    slug: "ashvin-praveen",
  },
  {
    name: "Brendan Beh",
    domain: "AI developer-ecosystem founder",
    oneLiner:
      "Cambridge physicist and former VC turned grassroots ecosystem builder; Co-Founder of AISEA, orchestrating a decentralised network of 10,000+ AI developers across Southeast Asia.",
    slug: "brendan-beh",
  },
  {
    name: "Carl Fernando",
    domain: "AI governance & risk expert",
    oneLiner:
      "AI governance leader and 20-year enterprise risk expert; Managing Director of CANDA Consulting, guiding organisations across Asia Pacific through safe, responsible and compliant AI implementation.",
    slug: "carl-fernando",
  },
  {
    name: "Chong Theng Hui",
    domain: "AI transformation engineer",
    oneLiner:
      "Fractional AI CTO and Former NAIO AI Advisory Committee Member; An accredited AI Trainer helping businesses execute AI transformation through AI agents, workflow automation, and practical AI adoption.",
    slug: "chong-theng-hui",
  },
  {
    name: "Fathy Rashad",
    domain: "AI builder & open-source founder",
    oneLiner:
      "Published MIT research at 19, now Co-Founder and CTO of Cleve.ai and Founder of Build for Public; driving scalable, open-source AI for social good.",
    slug: "fathy-rashad",
  },
  {
    name: "Lizzie Tan",
    domain: "Creator-economy startup founder",
    oneLiner:
      "Agency founder turned non-tech builder; Co-Founder and CMO of Cleve.ai, translating content expertise into AI tools that help 110,000+ creators worldwide scale without losing their voice.",
    slug: "lizzie-tan",
  },
  {
    name: "Marques Menon",
    domain: "Stewardship & nation-building strategist",
    oneLiner:
      "Strategy Director at Global Institute For Tomorrow (GIFT) and an engineer turned nation-builder; Co-Founder of Nation Building School, bridging big-picture development with everyday community empowerment.",
    slug: "marques-menon",
  },
  {
    name: "Matthieu Pujol",
    domain: "Global people & performance leader",
    oneLiner:
      "15-year global tech veteran and ex-Googler; HR and Marketing leader at brioHR, bridging the gap between knowing and doing by making human presence the foundation of performance.",
    slug: "matthieu-pujol",
  },
  {
    name: "Muhundhan Kamarapullai",
    domain: "National tech-innovation strategist",
    oneLiner:
      "Chief Digital Officer at MRANTI driving Malaysia's national R&D commercialisation; a two-decade digital leader focused on making technology human, scalable and measurable, and on transforming organisations rather than just digitising them.",
    slug: "muhundhan-kamarapullai",
  },
  {
    name: "Prof Murali Raman",
    domain: "Higher-ed & design-thinking leader",
    oneLiner:
      "Deputy Vice-Chancellor and Professor at Asia Pacific University (APU), with corporate roots at Accenture and Maybank; a design thinker closing the gap between university classrooms and industry realities.",
    slug: "murali-raman",
  },
  {
    name: "Dato' Ng Wan Peng",
    domain: "Digital-economy leader & board advisor",
    oneLiner:
      "Former COO of MDEC and a 20-year architect of Malaysia's digital economy, now serving across multiple boards, providing foresight into national policy, governance, and public-private partnerships.",
    slug: "ng-wan-peng",
  },
  {
    name: "Shawn D'Cotta",
    domain: "Learning & development expert",
    oneLiner:
      "Learning and development leader at Cegos Asia Pacific, leveraging a decade of business-building and corporate turnaround success to develop high-performing teams and future-ready leaders.",
    slug: "shawn-dcotta",
  },
  {
    name: "Tengku Hafiz",
    domain: "Human-centred space designer",
    oneLiner:
      "Architect and photographer turned workspace designer with 15 years shaping corporate, university and school environments across Asia Pacific; translating how people behave and what they need into spaces where they can be themselves and thrive.",
    slug: "tengku-hafiz",
  },
];

export const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "https://instagram.com/humaine.movement" },
  { label: "X", href: "https://x.com/humainemovement" },
  { label: "TikTok", href: "#" },
];

/** The four core values: left (what we value more) over right. */
export const VALUES = [
  { left: "Purposeful Use", right: "Passive Consumption", color: "amber" },
  { left: "Active Thinking", right: "Replacement of Thinking", color: "moss" },
  { left: "Human Agency", right: "Total Trust on Algorithms", color: "terracotta" },
  { left: "Deepen Humanness", right: "Efficiency-at-all-costs", color: "rose" },
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
    title: "Deepen Humanness",
    band: "rose",
    points: [
      "Protect time and space to be \"AI-free\", allowing for deep reflection and strategic thinking.",
      "Seek direct, first-hand experiences with people and places, beyond virtual ones.",
      "Nurture what makes you uniquely human: higher-order thinking, creative expression, and connecting through emotion.",
    ],
  },
];
