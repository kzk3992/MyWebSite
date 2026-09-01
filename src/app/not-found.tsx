import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import styles from "./content.module.css";

export default function NotFound() {
  return (
    <Container className={styles.notFound}>
      <div>
        <p className={styles.notFoundCode}>404 / LOST SPARK</p>
        <h1>Page not found.</h1>
        <p>お探しのページは移動したか、存在しない可能性があります。</p>
        <Button href="/">トップページへ戻る</Button>
      </div>
    </Container>
  );
}
