import Image from "next/image";
import { siteConfig } from "@/config/site";
import { BrandIcon } from "./BrandIcon";
import { Container } from "./Container";
import styles from "./components.module.css";

const footerLinks = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Support", href: "/support/" },
  { label: "About", href: "/about/" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerTop}>
          <div className={styles.footerIdentity}>
            <Image src="/brand/logo-white.png" width={56} height={56} alt="" />
            <div>
              <p className={styles.footerBrand}>{siteConfig.brandName}</p>
            <p className={styles.footerTagline}>{siteConfig.tagline}</p>
            </div>
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
          <a className={styles.toTop} href="#main-content" aria-label="ページ上部へ戻る">
            <BrandIcon name="power" size={34} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
