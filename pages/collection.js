import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { getCategories, getFullCollectionOfCocktails } from '../util/database';

export default function Collection(props) {
  const [cocktailList, setCocktailList] = useState(props.collectionCocktail);
  const showCocktailCategory = (category) => {
    setCocktailList(
      cocktailList.filter(
        (category) => category.name === cocktailList.category,
      ),
    );
  };

  return (
    <div>
      <Head>
        <title>Cocktails</title>

        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* {cocktailCategory} */}
        <button onClick={() => setCocktailList(cocktailList)}>
          FULL COLLECTION
        </button>

        {props.categories.map((category) => {
          return (
            <button
              key={category.name}
              onClick={() => {
                showCocktailCategory(category.name);
              }}
            >
              {category.name.toUpperCase()}
            </button>
          );
        })}

        <h1>hey, this is the full collection:</h1>
        <ul>
          {cocktailList.map((cocktailName) => {
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
  const categories = await getCategories();

  // console.log(categories);

  // console.log(collectionCocktail);

  return {
    props: {
      collectionCocktail,
      categories,
    },
  };
}
