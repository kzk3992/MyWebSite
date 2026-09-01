import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import styles from "./components.module.css";

const navigation = [
  { label: "Apps", href: "/#works" },
  { label: "About", href: "/about/" },
  { label: "Support", href: "/support/" },
];

export function Header() {
  return (
    <header className={styles.siteHeader}>
      <Container className={styles.headerInner}>
        <a className={styles.brand} href="/" aria-label={`${siteConfig.brandName} ホーム`}>
          <span className={styles.brandMark} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{siteConfig.brandName}</span>
        </a>
        <nav className={styles.nav} aria-label="メインナビゲーション">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
