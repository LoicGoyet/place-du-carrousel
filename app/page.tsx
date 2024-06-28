import styles from './page.module.css';
import CoverGenerator from '@/components/CoverGenerator';

export default function Home() {
  return (
    <main className={styles.main}>
      <CoverGenerator />
    </main>
  );
}
