import type { ReactNode } from "react";
import { legalDates } from "@/config/site";
import type { Locale } from "@/i18n/site";
import { Container } from "./Container";
import styles from "./components.module.css";

type LegalLayoutProps = {
  title: string;
  label: string;
  intro: string;
  children: ReactNode;
  locale?: Locale;
};

export function LegalLayout({ title, label, intro, children, locale = "ja" }: LegalLayoutProps) {
  const isJapanese = locale === "ja";
  return (
    <Container narrow>
      <article className={styles.legal}>
        <header className={styles.legalHeader}>
          <a className={styles.backLink} href={isJapanese ? "/apps/hirame/" : "/en/apps/hirame/"}>
            ← {isJapanese ? "Hirame" : "Hirame: Idea Trainer"}
          </a>
          <p className="eyebrow">{label}</p>
          <h1>{title}</h1>
          <p className={styles.legalIntro}>{intro}</p>
          <dl className={styles.legalDates}>
            <div>
              <dt>{isJapanese ? "制定日" : "Effective date"}</dt>
              <dd>{isJapanese ? legalDates.established : legalDates.establishedEnglish}</dd>
            </div>
            <div>
              <dt>{isJapanese ? "最終更新日" : "Last updated"}</dt>
              <dd>{isJapanese ? legalDates.updated : legalDates.updatedEnglish}</dd>
            </div>
          </dl>
        </header>
        <div className={styles.legalBody}>{children}</div>
      </article>
    </Container>
  );
}
