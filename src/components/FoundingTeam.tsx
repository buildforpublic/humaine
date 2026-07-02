import fs from "node:fs";
import path from "node:path";
import { FOUNDING_MEMBERS } from "@/content";
import { FoundingTeamGrid, type TeamCard } from "./FoundingTeamGrid";

const TEAM_DIR = path.join(process.cwd(), "public", "team");
const PHOTO_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/** The four brand accents, cycled across cards to echo the four values. */
const ACCENTS = ["amber", "moss", "terracotta", "rose"] as const;

/**
 * Map each member's slug to an existing photo in `/public/team/`, if any.
 * Drop a file named `<slug>.<ext>` (e.g. `aster-wei-su-hwa.jpg`) into that
 * folder and the headshot appears automatically — no code change needed.
 */
function findPhotos(): Map<string, string> {
  const photos = new Map<string, string>();
  let files: string[] = [];
  try {
    files = fs.readdirSync(TEAM_DIR);
  } catch {
    return photos; // folder missing / empty — everyone falls back to a monogram
  }
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!PHOTO_EXTS.includes(ext)) continue;
    photos.set(path.basename(file, ext), `/team/${file}`);
  }
  return photos;
}

export function FoundingTeam() {
  const photos = findPhotos();
  const cards: TeamCard[] = FOUNDING_MEMBERS.map((member, i) => ({
    name: member.name,
    domain: member.domain,
    oneLiner: member.oneLiner,
    slug: member.slug,
    photo: photos.get(member.slug),
    accent: ACCENTS[i % ACCENTS.length],
  }));

  return <FoundingTeamGrid members={cards} />;
}
