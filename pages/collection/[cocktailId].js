import Head from 'next/head';
import { getSingleCocktailFromCollection } from '../../util/database';

export default function Cocktail(props) {
  if (props.collectionCocktail === null) {
    return (
      <div>
        {' '}
        <Head>
          <title>Cocktails</title>
          <meta name="description" content="this cocktail does not exist" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>this cocktail does not exist</main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {' '}
        {props.collectionCocktail.id}
        {props.collectionCocktail.name}
        {props.collectionCocktail.level}
        {props.collectionCocktail.flavour}
        {props.collectionCocktail.spirit}
        {props.collectionCocktail.description}
        {props.collectionCocktail.glass}
        {props.collectionCocktail.ice}
        {props.collectionCocktail.garnish}
        {props.collectionCocktail.category}
        {props.collectionCocktail.size}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the ids that were set in recommendation.js out of the url and pass them to the database query
  const collectionCocktail = await getSingleCocktailFromCollection(
    context.query.cocktailId,
  );

  return {
    props: {
      collectionCocktail: collectionCocktail || null,
    },
  };
}
