import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { getAllNotes, getNote } from "@/lib/notes";
import styles from "../../../content.module.css";
import noteStyles from "../notes.module.css";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.meta.title,
    description: note.meta.description,
    alternates: { canonical: `/notes/${slug}/` },
    openGraph: {
      title: `${note.meta.title} | Mika Spark Studio`,
      description: note.meta.description,
      url: `/notes/${slug}/`,
      type: "article",
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.meta.title,
    description: note.meta.description,
    datePublished: note.meta.date,
    author: { "@type": "Person", name: "MiKa" },
    publisher: {
      "@type": "Organization",
      name: "Mika Spark Studio",
      url: "https://mikaspark.com/",
    },
    mainEntityOfPage: `${siteConfig.baseUrl}/notes/${slug}/`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className={styles.pageHero}>
        <Container>
          <p className="eyebrow">Notes</p>
          <h1 className={noteStyles.noteTitle}>{note.meta.title}</h1>
          <p className={noteStyles.noteDate}>
            <time dateTime={note.meta.date}>
              {note.meta.date.replaceAll("-", ".")}
            </time>
          </p>
        </Container>
      </section>

      <Section>
        <div
          className={`${styles.proseBody} ${noteStyles.noteBody}`}
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
        <p className={noteStyles.backLink}>
          <a href="/notes/">← Notes 一覧へ</a>
        </p>
      </Section>
    </>
  );
}
