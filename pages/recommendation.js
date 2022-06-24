import Cookies from 'js-cookie';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { getUserByValidSessionToken } from '../util/database';

export default function Recommendation(props) {
  const [flavour, setFlavour] = useState('');
  const [spirit, setSpirit] = useState('');
  const [level, setLevel] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>get a recommendation {props.user.username}</h1>

        <div>flavour:</div>

        <button
          onClick={() => {
            setFlavour('bitter');
          }}
        >
          bitter
        </button>
        <div>{flavour}</div>

        <div>spirit:</div>

        <div>alcohol level:</div>
        <buton>drink this</buton>
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
      destination: `/login?returnTo=/recommendation`,
      permanent: false,
    },
  };
}
