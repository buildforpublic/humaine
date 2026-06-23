import { getBoardMessages } from "@/db/queries";
import styles from "./MessageBoard.module.css";

export async function MessageBoard() {
  const messages = await getBoardMessages();

  if (messages.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No messages on the board yet.</p>
        <p className="muted">
          Be one of the first to leave a message when you sign — approved
          messages appear here.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.board}>
      {messages.map((m) => (
        <li key={m.id} className={styles.note}>
          <p className={styles.quote}>&ldquo;{m.message}&rdquo;</p>
          <p className={styles.attribution}>
            <span className={styles.name}>{m.displayName}</span>
            {(m.occupation || m.country) && (
              <span className={styles.meta}>
                {[m.occupation, m.country].filter(Boolean).join(" · ")}
              </span>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
