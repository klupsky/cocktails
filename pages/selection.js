import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getUserByValidSessionToken } from '../util/database';

export default function Selection() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>your selection</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }

  return {
    redirect: {
      destination: `/login?returnTo=/selection`,
      permanent: false,
    },
  };
}
