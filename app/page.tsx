import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>🚀 Welcome to Intern Screening Test</h1>
        <p className={styles.subtitle}>Explore your modern full-stack features below.</p>

        <div className={styles.buttonGroup}>
          <Link href="/Todopage" className={styles.button} style={{ color: "#2563EB" }}>
            ✅ Todo List App
          </Link>

          <Link href="/notesync" className={styles.button} style={{ color: "#7C3AED" }}>
            🔄 Node Sync View
          </Link>

          <Link href="/chatbox" className={styles.button} style={{ color: "#16A34A" }}>
             🤖 AI Chat Assistant
          </Link>

          <Link href="/summary" className={styles.button} style={{ color: "#DB2777" }}>
            📄 Question and answer
          </Link>
        </div>

        <footer className={styles.footer}>
          Built with 💖 Next.js + plain CSS
        </footer>
      </div>
    </main>
  );
}
