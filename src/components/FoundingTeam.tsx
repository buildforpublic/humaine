import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { FOUNDING_MEMBERS, type FoundingMember } from "@/content";
import styles from "./FoundingTeam.module.css";

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

/** First letters of the first two name words, skipping honorifics. */
function monogram(name: string): string {
  const skip = new Set(["dr", "prof", "dato'", "dato", "datuk", "tan", "sri"]);
  const words = name
    .split(/\s+/)
    .filter((w) => !skip.has(w.toLowerCase().replace(/[.]/g, "")));
  const initials = words.slice(0, 2).map((w) => w[0] ?? "");
  return initials.join("").toUpperCase();
}

function MemberCard({
  member,
  photo,
  accent,
}: {
  member: FoundingMember;
  photo?: string;
  accent: string;
}) {
  return (
    <li className={styles.card} data-accent={accent}>
      <div className={styles.head}>
        <div className={styles.avatar}>
          {photo ? (
            <Image
              src={photo}
              alt={member.name}
              fill
              sizes="72px"
              className={styles.photo}
            />
          ) : (
            <span className={styles.monogram} aria-hidden="true">
              {monogram(member.name)}
            </span>
          )}
        </div>
        <div className={styles.meta}>
          <h3 className={styles.name}>{member.name}</h3>
          <span className={styles.tag}>{member.domain}</span>
        </div>
      </div>
      <p className={styles.bio}>{member.oneLiner}</p>
    </li>
  );
}

export function FoundingTeam() {
  const photos = findPhotos();
  return (
    <ul className={styles.grid}>
      {FOUNDING_MEMBERS.map((member, i) => (
        <MemberCard
          key={member.slug}
          member={member}
          photo={photos.get(member.slug)}
          accent={ACCENTS[i % ACCENTS.length]}
        />
      ))}
    </ul>
  );
}
