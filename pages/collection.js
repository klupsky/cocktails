import Head from 'next/head';
import Link from 'next/link';
import { getFullCollectionOfCocktails } from '../util/database';

export default function Collection(props) {
  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>hey, this is the full collection:</h1>
        <ul>
          {props.collectionCocktail.map((cocktailName) => {
            return (
              <li key={`cocktailName-${cocktailName.id}`}>
                <Link href={`/collection/${cocktailName.id}`}>
                  {cocktailName.name}
                </Link>
                {cocktailName.category}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const collectionCocktail = await getFullCollectionOfCocktails();

  // console.log(collectionCocktail);

  return {
    props: {
      collectionCocktail,
    },
  };
}
