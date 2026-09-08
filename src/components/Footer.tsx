import Image from "next/image";
import { siteConfig } from "@/config/site";
import { footerLinks, shellText, type Locale } from "@/i18n/site";
import { BrandIcon } from "./BrandIcon";
import { Container } from "./Container";
import styles from "./components.module.css";

export function Footer({ locale }: { locale: Locale }) {
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
          <nav className={styles.footerNav} aria-label={shellText[locale].footerNavigation}>
            {footerLinks[locale].map((item) => (
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
          <a className={styles.toTop} href="#main-content" aria-label={shellText[locale].backToTop}>
            <BrandIcon name="power" size={34} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
