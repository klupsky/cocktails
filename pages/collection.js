import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Selection() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>full collection available for everyone</h1>
      </main>
    </div>
  );
}
