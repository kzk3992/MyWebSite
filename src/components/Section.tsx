import type { ReactNode } from "react";
import { Container } from "./Container";
import styles from "./components.module.css";

type SectionProps = {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  intro?: string;
  id?: string;
  tone?: "default" | "muted";
};

export function Section({
  children,
  eyebrow,
  title,
  intro,
  id,
  tone = "default",
}: SectionProps) {
  return (
    <section
      className={`${styles.section} ${tone === "muted" ? styles.sectionMuted : ""}`}
      id={id}
    >
      <Container>
        {(eyebrow || title || intro) && (
          <header className={styles.sectionHeader}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {intro && <p>{intro}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
