import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { setStringifiedCookie } from '../util/cookies';
import { getUserByValidSessionToken } from '../util/database';

export default function Recommendation(props) {
  const [flavour, setFlavour] = useState('');
  const [spirit, setSpirit] = useState('');
  const [level, setLevel] = useState('');

  // form submit links to recommended_cocktail page
  const onSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/recommended_cocktail';
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>get a recommendation {props.user.username}</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              flavour
              <input
                data-test-id="flavour-1"
                type="text"
                value={flavour}
                onChange={(event) => {
                  setFlavour(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <br />
          <div>
            <label>
              spirit:
              <input
                data-test-id="spirit-1"
                type="text"
                value={spirit}
                onChange={(event) => {
                  setSpirit(event.currentTarget.value);
                }}
              />{' '}
            </label>
          </div>{' '}
          <br />
          <div>
            <label>
              alcohol level:
              <input
                data-test-id="level-1"
                type="text"
                value={level}
                onChange={(event) => {
                  setLevel(event.currentTarget.value);
                }}
              />{' '}
            </label>
          </div>{' '}
          <br />
          <button
            data-test-id="generate-recommendation"
            onClick={() => {
              const recommendation = [
                {
                  flavour: flavour,
                  spirit: spirit,
                  level: level,
                },
              ];

              setStringifiedCookie('recommendation', recommendation);
            }}
          >
            get a recommendation
          </button>
        </form>
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
