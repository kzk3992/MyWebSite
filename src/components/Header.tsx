import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import { BrandIcon } from "./BrandIcon";
import styles from "./components.module.css";

const navigation = [
  { label: "Works", href: "/#works" },
  { label: "About", href: "/about/" },
  { label: "Support", href: "/support/" },
];

export function Header() {
  return (
    <header className={styles.siteHeader}>
      <Container className={styles.headerInner}>
        <a className={styles.brand} href="/" aria-label={`${siteConfig.brandName} ホーム`}>
          <Image src="/brand/logo.png" width={36} height={36} alt="" priority />
          <span>Mika Spark <b>Studio</b></span>
        </a>
        <nav className={styles.nav} aria-label="メインナビゲーション">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <details className={styles.mobileMenu}>
          <summary aria-label="メニューを開く">
            <BrandIcon name="spark" size={38} />
          </summary>
          <nav aria-label="モバイルナビゲーション">
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href}>
                <span>0{index + 1}</span>{item.label}
              </a>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
