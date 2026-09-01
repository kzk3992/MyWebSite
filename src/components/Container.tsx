import type { ElementType, ReactNode } from "react";
import styles from "./components.module.css";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  narrow?: boolean;
};

export function Container({
  children,
  as: Component = "div",
  className = "",
  narrow = false,
}: ContainerProps) {
  const classes = [styles.container, narrow ? styles.containerNarrow : "", className]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
}
