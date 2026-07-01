import { db, ensureSchema } from "./client";
import { resources, type NewResource } from "./schema";
import type { Audience, Origin, ResourceType, ValueKey } from "./resource-values";

/**
 * Canonical seed dataset: the 40 curated resources from the HumAIne Resource
 * Bank spreadsheet, plus the six "Start Here" featured picks.
 *
 * Transcription rules applied to the source spreadsheet:
 * - The four spreadsheet "Type" tables map to values by theme, in this order:
 *   table 1 -> agency, table 2 -> purposeful, table 3 -> active, table 4 -> humanness.
 * - `origin` normalized to the five canonical buckets (parentheticals like
 *   "(local)" / "(preprint)" dropped; for combined origins the primary is kept).
 * - Em dashes removed from copy per the brand rule (replaced with ":" or ",").
 * - The six Start Here rows carry `featured`, `featuredOrder`, and `featuredWhy`
 *   (the "why start here" line, which differs from the card one-liner).
 */
type SeedResource = {
  value: ValueKey;
  type: ResourceType;
  title: string;
  source: string;
  origin: Origin;
  length: string;
  audience: Audience[];
  oneLiner: string;
  link: string;
  notes?: string;
  featuredOrder?: number;
  featuredWhy?: string;
};

export const RESOURCES: SeedResource[] = [
  // --- Human Agency (over Total Trust on Algorithms) ---
  {
    value: "agency",
    type: "Article",
    title: "Leading with Digital Confidence",
    source: "Centre of Applied Metacognition (Dr Sumitra Nair)",
    origin: "HumAIne",
    length: "5 min",
    audience: ["Leaders"],
    oneLiner:
      "Let AI inform your decisions but never own them: on judgment, oversight, and the cost of outsourcing thinking.",
    link: "https://www.otti.life/post/leading-with-digital-confidence",
  },
  {
    value: "agency",
    type: "Tool",
    title: "Are You Overrelying On AI?",
    source: "Otti NeuroLearning Institute",
    origin: "HumAIne",
    length: "2 min",
    audience: ["Everyone"],
    oneLiner:
      "A quick quiz to reveal whether you're outsourcing your brain too much to AI.",
    link: "https://aireliancequiz.lovable.app/",
  },
  {
    value: "agency",
    type: "Article",
    title: "Defend Your Decisions",
    source: "The Star (APU Prof Dr Abtar)",
    origin: "Independent",
    length: "4 min",
    audience: ["Educators"],
    oneLiner:
      "Redesign university assessment so students show reasoning and accountability that AI cannot fake.",
    link: "https://www.thestar.com.my/news/education/2026/03/01/defend-your-decisions",
  },
  {
    value: "agency",
    type: "Article",
    title: "Make AI Literacy the Essential Ingredient of Our Education",
    source: "Malay Mail (Shazlin Niza Ab Razak)",
    origin: "Independent",
    length: "6 min",
    audience: ["Educators", "Everyone"],
    oneLiner:
      "AI literacy means being able to question and challenge automated decisions, not just operate the tools.",
    link: "https://www.malaymail.com/news/what-you-think/2026/01/03/make-ai-literacy-the-essential-ingredient-of-our-education-shazlin-niza-ab-razak/204124",
  },
  {
    value: "agency",
    type: "Video",
    title: "Why AI Is Incredibly Smart and Shockingly Stupid",
    source: "TED (ft. Yejin Choi)",
    origin: "Independent",
    length: "15 min",
    audience: ["Everyone"],
    oneLiner:
      "Where AI fails at common sense and moral judgment: the case that human oversight isn't optional.",
    link: "https://www.ted.com/talks/yejin_choi_why_ai_is_incredibly_smart_and_shockingly_stupid",
    featuredOrder: 6,
    featuredWhy:
      "Where AI fails at common sense and moral judgment: the case that human oversight isn't optional.",
  },
  {
    value: "agency",
    type: "Research",
    title:
      "Navigating the Jagged Technological Frontier: AI and Knowledge-Worker Productivity & Quality",
    source: "Harvard Business School (Dell'Acqua et al.)",
    origin: "Academic",
    length: "30 min",
    audience: ["Leaders", "Everyone"],
    oneLiner:
      "AI boosted tasks inside its 'frontier', but outside it AI users did 19 points worse: 'mis-calibrated trust' and the cost of switching off judgment.",
    link: "https://www.hbs.edu/faculty/Pages/item.aspx?num=64700",
    notes: "Peer-reviewed.",
  },
  {
    value: "agency",
    type: "Research",
    title: "Thinking: Fast, Slow, and Artificial: The Rise of Cognitive Surrender",
    source: "The Wharton School (Steven D. Shaw & Gideon Nave)",
    origin: "Academic",
    length: "25 min",
    audience: ["Everyone", "Leaders"],
    oneLiner:
      "Names 'cognitive surrender': uncritically accepting AI's answers over your own reasoning; accuracy fell 15 pts when the AI was wrong.",
    link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646",
    notes: "Working paper; preregistered experiments.",
  },
  {
    value: "agency",
    type: "Research",
    title:
      "Exploring Collaborative Decision-Making: Human and Generative AI Interaction",
    source: "Science Direct: Technology in Society",
    origin: "Academic",
    length: "30 min",
    audience: ["Leaders"],
    oneLiner:
      "A quasi-experiment on how human judgment and GenAI can combine in real-world group decisions.",
    link: "https://www.sciencedirect.com/science/article/pii/S0160791X24002100",
    notes: "Peer-reviewed.",
  },

  // --- Purposeful Use (over Passive Consumption) ---
  {
    value: "purposeful",
    type: "Article",
    title: "Human-AI Synergy: Rethinking Intelligence for the AI Era",
    source: "Centre of Applied Metacognition",
    origin: "HumAIne",
    length: "35 min",
    audience: ["Everyone"],
    oneLiner:
      "Discovering how to co-create with machines without losing the uniquely human mind that sets you apart: the thinking beneath the movement.",
    link: "https://www.otti.life/cam-white-paper",
    featuredOrder: 1,
    featuredWhy: "The thinking beneath the whole movement.",
  },
  {
    value: "purposeful",
    type: "Article",
    title:
      "AI Is Not the Threat. The Real Threat Is People Who Don't Know How to Use It.",
    source: "Centre of Applied Metacognition",
    origin: "HumAIne",
    length: "4 min",
    audience: ["Everyone"],
    oneLiner:
      "The danger was never the technology: it's using it thoughtlessly. What using AI well actually looks like.",
    link: "https://www.otti.life/post/ai-is-not-the-threat-the-real-threat-is-people-who-don-t-know-how-to-use-it",
    featuredOrder: 2,
    featuredWhy: "A 4-minute primer on what using AI well actually looks like.",
  },
  {
    value: "purposeful",
    type: "Podcast",
    title: "6 Human+AI Skills That Will Make or Break Founders in 2025",
    source: "Tech It or Leave It (feat. Otti founder Aster Wei)",
    origin: "HumAIne-affiliated",
    length: "70 min",
    audience: ["Entrepreneurs", "Leaders"],
    oneLiner:
      "Aster Wei on the psychology of AI resistance and building 'Human-AI Synergy' within teams.",
    link: "https://open.spotify.com/episode/0Qzve9kRwSsG9lezGbt37q",
  },
  {
    value: "purposeful",
    type: "Tool",
    title: "Discover Your DnA Character",
    source: "Otti NeuroLearning Institute",
    origin: "HumAIne",
    length: "5 min",
    audience: ["Everyone"],
    oneLiner:
      "A quick check on your digital and AI fluency, and where to grow next.",
    link: "https://www.otti.life/dna-quiz",
  },
  {
    value: "purposeful",
    type: "Column",
    title: "One Useful Thing",
    source: "Ethan Mollick",
    origin: "Independent",
    length: "20 min",
    audience: ["Everyone"],
    oneLiner:
      "Grounded, hype-free guide to using AI with judgment: when to lead, when to delegate. Start with 'I, Cyborg'.",
    link: "https://www.oneusefulthing.org/",
  },
  {
    value: "purposeful",
    type: "Research",
    title: "What 81,000 People Want from AI",
    source: "Anthropic",
    origin: "Industry",
    length: "25 min",
    audience: ["Everyone", "Policymakers", "Leaders"],
    oneLiner:
      "Large-scale evidence of what people actually want from AI: useful grounding for purposeful, human-led use.",
    link: "https://www.anthropic.com/features/81k-interviews",
  },
  {
    value: "purposeful",
    type: "Research",
    title: "Anthropic Economic Index: first report",
    source: "Anthropic",
    origin: "Industry",
    length: "20 min",
    audience: ["Leaders", "Policymakers"],
    oneLiner:
      "Real-world usage leans to augmentation (57%) over automation: AI mostly extends human work, not replaces it.",
    link: "https://www.anthropic.com/news/the-anthropic-economic-index",
  },

  // --- Active Thinking (over Replacement of Thinking) ---
  {
    value: "active",
    type: "Podcast",
    title: "Think Before You AI",
    source: "BFM (feat. Aster Wei)",
    origin: "HumAIne-affiliated",
    length: "31 min",
    audience: ["Everyone"],
    oneLiner:
      "Neuroscientist Aster Wei on what happens to the human mind when AI starts doing the thinking for us.",
    link: "https://www.bfm.my/content/podcast/think-before-you-ai",
    featuredOrder: 3,
    featuredWhy: "Listen: what happens to the mind when AI does the thinking.",
  },
  {
    value: "active",
    type: "Podcast",
    title: "Can AI Cause Brain Rot?",
    source: "Otti NeuroLearning Institute",
    origin: "HumAIne",
    length: "40 min",
    audience: ["Everyone"],
    oneLiner:
      "Aster & YJ on the reality of 'AI brain rot' and a 'thinking first, AI second' mindset to avoid cognitive atrophy.",
    link: "https://www.youtube.com/watch?v=pWEsHVju8JM",
  },
  {
    value: "active",
    type: "Article",
    title: "Is AI Making Us “Dumber”? Reclaiming Metacognition in the AI Era",
    source: "Centre of Applied Metacognition",
    origin: "HumAIne",
    length: "4 min",
    audience: ["Everyone"],
    oneLiner:
      "Offloading thinking to AI has a cost: how to keep your metacognition sharp.",
    link: "https://www.otti.life/post/is-ai-making-us-dumber-reclaiming-metacognition-in-the-ai-era",
    featuredOrder: 4,
    featuredWhy:
      "An easy 4-minute read on the cost of offloading thinking, and how to keep your mind sharp.",
  },
  {
    value: "active",
    type: "Article",
    title: "Neuroplasticity: Your Competitive Edge in an AI-Driven World",
    source: "Centre of Applied Metacognition",
    origin: "HumAIne",
    length: "5 min",
    audience: ["Everyone"],
    oneLiner:
      "Your brain's ability to adapt is the edge AI can't replicate: how to train it deliberately.",
    link: "https://www.otti.life/post/neuroplasticity-your-competitive-edge-in-an-ai-driven-world",
  },
  {
    value: "active",
    type: "Article",
    title: "Thinking Better with AI: How to Use GenAI As Your Thought Partner",
    source: "Centre of Applied Metacognition",
    origin: "HumAIne",
    length: "6 min",
    audience: ["Everyone"],
    oneLiner:
      "How to use generative AI as a thought partner that deepens your intelligence rather than replacing it.",
    link: "https://www.otti.life/post/thinking-better-with-ai-how-to-use-genai-as-your-thought-partner",
  },
  {
    value: "active",
    type: "Research",
    title: "Your Brain on ChatGPT",
    source: "MIT Media Lab (Kosmyna et al.)",
    origin: "Academic",
    length: "30 min",
    audience: ["Everyone", "Educators"],
    oneLiner:
      "EEG found AI-assisted writers had the weakest brain connectivity and lowest ownership: 'cognitive debt' over four months.",
    link: "https://www.media.mit.edu/publications/your-brain-on-chatgpt/",
    notes: "Preprint, small sample, contested. Cite as suggestive.",
  },
  {
    value: "active",
    type: "Research",
    title: "The Impact of Generative AI on Critical Thinking",
    source: "Microsoft Research & Carnegie Mellon University",
    origin: "Industry",
    length: "25 min",
    audience: ["Leaders", "Everyone"],
    oneLiner:
      "Higher confidence in AI tracked with less critical thinking and less diverse outputs (survey, n=319).",
    link: "https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/",
    notes: "Peer-reviewed; vendor-affiliated.",
  },
  {
    value: "active",
    type: "Article",
    title: "What Kind of Writer Is ChatGPT?",
    source: "The New Yorker (ft. Cal Newport)",
    origin: "Independent",
    length: "15 min",
    audience: ["Everyone"],
    oneLiner:
      "AI smooths away the productive struggle of writing, exactly where thinking happens.",
    link: "https://www.newyorker.com/culture/annals-of-inquiry/what-kind-of-writer-is-chatgpt",
  },
  {
    value: "active",
    type: "Video",
    title: "How to Stop AI from Killing Your Critical Thinking",
    source: "TED (ft. Advait Sarkar)",
    origin: "Independent",
    length: "13 min",
    audience: ["Everyone"],
    oneLiner:
      "Avoid becoming a 'middle manager of your own thoughts'; AI use that nudges reflection.",
    link: "https://www.ted.com/talks/advait_sarkar_how_to_stop_ai_from_killing_your_critical_thinking",
    featuredOrder: 5,
    featuredWhy: "An independent voice on using AI to think more, not less.",
  },
  {
    value: "active",
    type: "Column",
    title: "Paul Graham: Essays",
    source: "Paul Graham",
    origin: "Independent",
    length: "20 min",
    audience: ["Everyone"],
    oneLiner:
      "Why writing is thinking. Start with 'Writes and Write-Nots', 'How to Think for Yourself', 'Putting Ideas Into Words'.",
    link: "https://www.paulgraham.com/articles.html",
  },
  {
    value: "active",
    type: "Research",
    title:
      "AI Tools in Society: Impacts on Cognitive Offloading and the Future of Critical Thinking",
    source: "MDPI: Societies",
    origin: "Academic",
    length: "25 min",
    audience: ["Everyone", "Educators", "Researchers"],
    oneLiner:
      "Frequent AI use correlated with weaker critical thinking, mediated by cognitive offloading and rising trust in the tools.",
    link: "https://www.mdpi.com/2075-4698/15/1/6",
    notes: "Peer-reviewed; correlational.",
  },
  {
    value: "active",
    type: "Research",
    title: "Outsourcing Cognition: The Psychological Costs of AI-era Convenience",
    source: "Frontiers in Psychology (Jose et al.)",
    origin: "Academic",
    length: "25 min",
    audience: ["Everyone", "Educators", "Researchers"],
    oneLiner:
      "Maps how offloading thinking to AI erodes memory, attention, metacognition and the sense of cognitive autonomy.",
    link: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1645237/full",
    notes: "Peer-reviewed review.",
  },

  // --- Deepen Humanness (over Efficiency-at-all-costs) ---
  {
    value: "humanness",
    type: "Video",
    title: "Moving into AI 2.0, We Need Humanity 2.0",
    source: "Otti NeuroLearning Institute (Dato Wei Chuan Beng)",
    origin: "HumAIne",
    length: "23 min",
    audience: ["Everyone"],
    oneLiner: "Keynote on why an upgrade in AI demands an upgrade in our humanity.",
    link: "https://www.youtube.com/watch?v=ltw9LBy6Bi8",
  },
  {
    value: "humanness",
    type: "Article",
    title: "The Human Revolution: Introducing Human Competencies",
    source: "Centre of Applied Metacognition",
    origin: "HumAIne",
    length: "20 min",
    audience: ["Everyone"],
    oneLiner:
      "Human capabilities matter more, not less, as AI rises: the five human competencies to develop.",
    link: "https://www.otti.life/cam-white-paper",
  },
  {
    value: "humanness",
    type: "Article",
    title:
      "AI Is Demolishing Education? A Brain Scientist's Take on Rebuilding Learning",
    source: "Centre of Applied Metacognition (Chang Yin Jue)",
    origin: "HumAIne",
    length: "4 min",
    audience: ["Everyone", "Educators"],
    oneLiner: "What AI breaks in learning, and how we rebuild it around human strengths.",
    link: "https://www.otti.life/post/ai-is-demolishing-education-a-brain-scientist-s-take-on-rebuilding-learning-in-the-ai-era",
  },
  {
    value: "humanness",
    type: "Article",
    title: "The Hard Truth: AI Is Smarter Than the Average Human",
    source: "Centre of Applied Metacognition",
    origin: "HumAIne",
    length: "3 min",
    audience: ["Everyone"],
    oneLiner:
      "A provocation on how capable AI has become, and why that raises the stakes for staying distinctly human.",
    link: "https://www.otti.life/post/ai-is-smarter-than-average-human",
  },
  {
    value: "humanness",
    type: "Podcast",
    title: "Your Voice vs. AI: The Future of Content Creation",
    source: "Tech It or Leave It (feat. Cleve.ai founders)",
    origin: "HumAIne-affiliated",
    length: "56 min",
    audience: ["Everyone"],
    oneLiner:
      "Blending AI tools with lived experience to stand out in a sea of AI-generated content.",
    link: "https://open.spotify.com/episode/4y91szMFxHtoQrRA522b7O",
  },
  {
    value: "humanness",
    type: "Article",
    title: "Building Emotional Intelligence in Malaysia's Digital Generation",
    source: "Bernama Thoughts (Jolene Chong)",
    origin: "Independent",
    length: "3 min",
    audience: ["Everyone", "Educators"],
    oneLiner:
      "Nurturing emotional intelligence so young people stay grounded and connected amid digital and AI noise.",
    link: "https://www.bernama.com/en/thoughts/news.php?id=2487333",
  },
  {
    value: "humanness",
    type: "Article",
    title: "Reclaiming Conversation in the Age of AI",
    source: "Sherry Turkle - After Babel",
    origin: "Independent",
    length: "12 min",
    audience: ["Everyone"],
    oneLiner:
      "Machine 'empathy' is a performance; the friction of real conversation is what deepens us.",
    link: "https://www.afterbabel.com/p/reclaiming-conversation-age-of-ai",
  },
  {
    value: "humanness",
    type: "Podcast",
    title: "AI, Productivity, and Human Finitude (Oliver Burkeman)",
    source: "Behavioral Scientist / Behavioral Design Podcast",
    origin: "Independent",
    length: "15 min",
    audience: ["Everyone"],
    oneLiner: "What's lost when writing is no longer the work of a finite, feeling human.",
    link: "https://behavioralscientist.org/ai-productivity-and-human-finitude-a-conversation-with-oliver-burkeman/",
  },
  {
    value: "humanness",
    type: "Column",
    title: "The Convivial Society",
    source: "L. M. Sacasas",
    origin: "Independent",
    length: "20 min",
    audience: ["Everyone"],
    oneLiner:
      "Think slowly about how technology reshapes attention and what it means to stay human.",
    link: "https://theconvivialsociety.substack.com/",
  },
  {
    value: "humanness",
    type: "Video",
    title: "Are Our Brains Ready for the Future? The 21st Century Brain",
    source: "University of Cambridge",
    origin: "Academic",
    length: "17 min",
    audience: ["Everyone"],
    oneLiner:
      "Cambridge neuroscience on how adaptable the human brain is in a tech- and AI-shaped world.",
    link: "https://www.youtube.com/watch?v=JPpUzlVt-lg",
  },
  {
    value: "humanness",
    type: "Report",
    title: "The Human Advantage: Stronger Brains in the Age of AI",
    source: "World Economic Forum & McKinsey Health Institute",
    origin: "Industry",
    length: "20 min",
    audience: ["Leaders", "Policymakers"],
    oneLiner:
      "The economic case for 'brain capital': putting human potential at the centre as AI reshapes work.",
    link: "https://www.weforum.org/publications/the-human-advantage-stronger-brains-in-the-age-of-ai/",
  },
  {
    value: "humanness",
    type: "Research",
    title: "Transforming Artificial Intelligence into Artificial Wisdom",
    source: "Nature Mental Health (Jeste et al.)",
    origin: "Academic",
    length: "20 min",
    audience: ["Researchers", "Policymakers"],
    oneLiner: "Argues AI should be built to cultivate human wisdom, not just intelligence.",
    link: "https://www.nature.com/articles/s44220-026-00640-6",
  },
  {
    value: "humanness",
    type: "Research",
    title:
      "Generative AI Enhances Individual Creativity but Reduces the Collective Diversity of Novel Content",
    source: "Science Advances (Anil R. Doshi & Oliver P. Hauser)",
    origin: "Academic",
    length: "25 min",
    audience: ["Researchers", "Educators"],
    oneLiner:
      "AI ideas made individual stories more creative but made everyone's output more alike: individual gain, collective loss of originality.",
    link: "https://www.science.org/doi/10.1126/sciadv.adn5290",
    notes: "Peer-reviewed.",
  },
];

/**
 * Insert the seed resources, but only if the table is currently empty.
 * Idempotent and safe to call repeatedly (local dev or one-off prod import).
 * Returns the number of rows inserted (0 if the bank already had content).
 */
export async function seedResources(): Promise<number> {
  await ensureSchema();
  const existing = await db.select({ id: resources.id }).from(resources).limit(1);
  if (existing.length > 0) return 0;

  const rows: NewResource[] = RESOURCES.map((r, i) => ({
    value: r.value,
    type: r.type,
    title: r.title,
    source: r.source,
    origin: r.origin,
    length: r.length,
    audience: r.audience.join(", "),
    oneLiner: r.oneLiner,
    link: r.link,
    notes: r.notes ?? null,
    featured: r.featuredOrder != null,
    featuredOrder: r.featuredOrder ?? null,
    featuredWhy: r.featuredWhy ?? null,
    published: true,
    sortOrder: i,
  }));

  await db.insert(resources).values(rows);
  return rows.length;
}
