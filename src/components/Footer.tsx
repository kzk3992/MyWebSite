import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import styles from "./components.module.css";

const footerLinks = [
  { label: "Privacy", href: "/apps/hirame/privacy/" },
  { label: "Terms", href: "/apps/hirame/terms/" },
  { label: "Support", href: "/support/" },
  { label: "About", href: "/about/" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerTop}>
          <div>
            <p className={styles.footerBrand}>{siteConfig.brandName}</p>
            <p className={styles.footerTagline}>{siteConfig.tagline}</p>
          </div>
          <nav className={styles.footerNav} aria-label="フッターナビゲーション">
            {footerLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <p>
            Copyright © {siteConfig.copyrightYear} {siteConfig.brandName}
          </p>
          <p>Made independently in Japan.</p>
        </div>
      </Container>
    </footer>
  );
}
