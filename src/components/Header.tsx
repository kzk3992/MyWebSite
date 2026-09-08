"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { languageSwitchPath, navigation, shellText, type Locale } from "@/i18n/site";
import { Container } from "./Container";
import styles from "./components.module.css";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const text = shellText[locale];
  const languageHref = languageSwitchPath(pathname, locale);
  const otherLocale = locale === "ja" ? "EN" : "JA";

  return (
    <header className={styles.siteHeader}>
      <Container className={styles.headerInner}>
        <a className={styles.brand} href={locale === "ja" ? "/" : "/en/"} aria-label={text.brandHome}>
          <Image src="/brand/logo.png" width={36} height={36} alt="" priority />
          <span>Mika Spark <b>Studio</b></span>
        </a>
        <nav className={styles.nav} aria-label={text.mainNavigation}>
          {navigation[locale].map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className={styles.languageSwitch} href={languageHref} hrefLang={locale === "ja" ? "en" : "ja"}>
            <span aria-current="page">{locale.toUpperCase()}</span><i>/</i><b>{otherLocale}</b>
          </a>
        </nav>
        <details className={styles.mobileMenu}>
          <summary aria-label={text.openMenu}>
            <span className={styles.menuIcon} aria-hidden="true"><i /><i /><i /></span>
          </summary>
          <nav aria-label={text.mobileNavigation}>
            {navigation[locale].map((item, index) => (
              <a key={item.href} href={item.href}>
                <span>0{index + 1}</span>{item.label}
              </a>
            ))}
            <a href={languageHref} hrefLang={locale === "ja" ? "en" : "ja"}>
              <span>04</span>{locale.toUpperCase()} / {otherLocale}
            </a>
          </nav>
        </details>
      </Container>
    </header>
  );
}
