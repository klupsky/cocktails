import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>hello</h1>
        <Link href="/register">
          <div>register</div>
        </Link>
        <Link href="/login">
          <div>login</div>
        </Link>
      </main>
    </div>
  );
}
