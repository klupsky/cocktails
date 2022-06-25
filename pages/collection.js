import Head from 'next/head';
import {
  getFullCollectionOfCocktails,
  getUserByValidSessionToken,
} from '../util/database';

export default function Collection(props) {
  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>hey {props.user.username}, this is the full collection:</h1>
        {props.collectionCocktail.name}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  const collectionCocktails = await getFullCollectionOfCocktails(context.query);

  console.log(collectionCocktails);

  const collectionCocktail = {
    names: collectionCocktails.map((name) => {
      return {
        name: name.name,
      };
    }),
  };
  console.log(collectionCocktail);

  if (user) {
    return {
      props: {
        user: user,
        collectionCocktail,
      },
    };
  }

  return {
    redirect: {
      destination: `/login?returnTo=/collection`,
      permanent: false,
    },
  };
}
