import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { getAllNotes } from "@/lib/notes";
import styles from "../../content.module.css";
import noteStyles from "./notes.module.css";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Mika Spark Studioの開発ノート。個人開発の進捗、失敗、検証の記録を短いコラムで残します。",
  alternates: { canonical: "/notes/" },
  openGraph: {
    title: "Notes | Mika Spark Studio",
    description:
      "Mika Spark Studioの開発ノート。個人開発の進捗、失敗、検証の記録。",
    url: "/notes/",
  },
};

export default function NotesPage() {
  const notes = getAllNotes();
  return (
    <>
      <section className={styles.pageHero}>
        <Container>
          <p className="eyebrow">Notes / Development log</p>
          <h1>
            開発ノート<span className={noteStyles.heroDot}>.</span>
          </h1>
          <p className={styles.pageHeroLead}>
            個人開発の進捗、失敗、検証の記録です。数字と出来事だけを、短く残します。
          </p>
        </Container>
      </section>

      <Section>
        <ul className={noteStyles.noteList}>
          {notes.map((note) => (
            <li key={note.slug}>
              <a className={noteStyles.noteCard} href={`/notes/${note.slug}/`}>
                <time dateTime={note.date}>{note.date.replaceAll("-", ".")}</time>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
