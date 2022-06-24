import Head from 'next/head';
import { useState } from 'react';
import { getUserByValidSessionToken } from '../util/database';

export default function RecommendedCocktail(props) {
  const [flavour, setFlavour] = useState('');
  const [spirit, setSpirit] = useState('');
  const [level, setLevel] = useState('');

  // form submit links to recommended_cocktail page

  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>hey {props.user.username} drink this</h1>
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
