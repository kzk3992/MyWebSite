import type { ReactNode } from "react";
import { Container } from "./Container";
import { BrandIcon } from "./BrandIcon";
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
            {eyebrow && <div className={styles.sectionEyebrow}><BrandIcon name="spark" size={28} /><p className="eyebrow">{eyebrow}</p></div>}
            {title && <h2>{title}</h2>}
            {intro && <p>{intro}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
