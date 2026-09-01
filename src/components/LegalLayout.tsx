import type { ReactNode } from "react";
import { legalDates } from "@/config/site";
import { Container } from "./Container";
import styles from "./components.module.css";

type LegalLayoutProps = {
  title: string;
  label: string;
  intro: string;
  children: ReactNode;
};

export function LegalLayout({ title, label, intro, children }: LegalLayoutProps) {
  return (
    <Container narrow>
      <article className={styles.legal}>
        <header className={styles.legalHeader}>
          <a className={styles.backLink} href="/apps/hirame/">
            ← Hirame
          </a>
          <p className="eyebrow">{label}</p>
          <h1>{title}</h1>
          <p className={styles.legalIntro}>{intro}</p>
          <dl className={styles.legalDates}>
            <div>
              <dt>制定日</dt>
              <dd>{legalDates.established}</dd>
            </div>
            <div>
              <dt>最終更新日</dt>
              <dd>{legalDates.updated}</dd>
            </div>
          </dl>
        </header>
        <div className={styles.legalBody}>{children}</div>
      </article>
    </Container>
  );
}
