import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import styles from "../../content.module.css";

export type WorkFeature = { name: string; text: string };
export type WorkExtraSection = { aside: string; title: string; paragraphs: readonly string[] };
export type WorkLink = { label: string; description: string; href: string; external: boolean };

export type WorkDetailData = {
  index: string;
  name: string;
  lead: string;
  meta: readonly (readonly [string, string])[];
  overviewTitle: string;
  overview: readonly string[];
  features?: readonly WorkFeature[];
  extras?: readonly WorkExtraSection[];
  links: readonly WorkLink[];
};

/** Works詳細ページ共通レイアウト（/works/<slug>/）。本文は各ページのデータで差し替える。 */
export function WorkDetail({ data }: { data: WorkDetailData }) {
  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">Works / {data.index}</p>
            <h1>{data.name}</h1>
            <p className={styles.pageHeroLead}>{data.lead}</p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="作品情報">
            <dl>
              {data.meta.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <Section>
        <div className={styles.proseGrid}>
          <p className={styles.proseAside}>Overview</p>
          <div className={styles.proseBody}>
            <h2>{data.overviewTitle}</h2>
            {data.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      {data.features && (
        <Section eyebrow="Features" title="特徴">
          <div className={styles.featureTimeline}>
            {data.features.map((feature, index) => (
              <div className={styles.featureItem} key={feature.name}>
                <span className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{feature.name}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.extras?.map((extra) => (
        <Section key={extra.title}>
          <div className={styles.proseGrid}>
            <p className={styles.proseAside}>{extra.aside}</p>
            <div className={styles.proseBody}>
              <h2>{extra.title}</h2>
              {extra.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section eyebrow="Links" title="リンク">
        <div className={styles.supportList}>
          {data.links.map((link) => (
            <a
              className={styles.supportCard}
              href={link.href}
              key={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <div>
                <h3>{link.label}</h3>
                <p>{link.description}</p>
              </div>
              <span className={styles.supportCardArrow} aria-hidden="true">→</span>
            </a>
          ))}
          <a className={styles.supportCard} href="/works/">
            <div>
              <h3>Works 一覧</h3>
              <p>作品一覧ページへ戻る</p>
            </div>
            <span className={styles.supportCardArrow} aria-hidden="true">→</span>
          </a>
        </div>
      </Section>
    </>
  );
}
