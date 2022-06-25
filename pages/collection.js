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
        <ul>
          {props.collectionCocktail.cocktailNames.map((cocktailName) => {
            return (
              <li key={`cocktailName-${cocktailName.id}`}>
                {' '}
                {cocktailName.name}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  const collectionCocktails = await getFullCollectionOfCocktails(context.query);

  // console.log(collectionCocktails);

  const collectionCocktail = {
    cocktailNames: collectionCocktails.map((cocktailName) => {
      return {
        id: cocktailName.id,
        name: cocktailName.name,
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
