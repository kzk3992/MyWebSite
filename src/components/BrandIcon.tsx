import Image from "next/image";
import styles from "./components.module.css";

export type BrandIconName = "wolf" | "spark" | "paw" | "power" | "arrow-left" | "arrow-right";

type BrandIconProps = {
  name: BrandIconName;
  size?: number;
  className?: string;
  decorative?: boolean;
  label?: string;
};

export function BrandIcon({
  name,
  size = 34,
  className = "",
  decorative = true,
  label,
}: BrandIconProps) {
  return (
    <Image
      className={`${styles.brandIcon} ${className}`}
      src={`/brand/icons/${name}.png`}
      width={size}
      height={size}
      alt={decorative ? "" : (label ?? name)}
      aria-hidden={decorative || undefined}
    />
  );
}
