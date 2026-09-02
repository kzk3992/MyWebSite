import type { ReactNode } from "react";
import { BrandIcon } from "./BrandIcon";
import styles from "./components.module.css";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  external = false,
  disabled = false,
}: ButtonProps) {
  const className = `${styles.button} ${styles[`button-${variant}`]}`;

  if (!href || disabled) {
    return (
      <span className={`${className} ${styles.buttonDisabled}`} aria-disabled="true">
        {children}<span className={styles.buttonStatus}>—</span>
      </span>
    );
  }

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}<BrandIcon name="arrow-right" size={26} />
      </a>
    );
  }

  return <a className={className} href={href}>{children}<BrandIcon name="arrow-right" size={26} /></a>;
}
