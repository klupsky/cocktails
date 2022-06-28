import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getUserByValidSessionToken } from '../util/database';

export default function Recommendation(props) {
  const [flavourId, setFlavourId] = useState('');
  const [spiritId, setSpiritId] = useState('');
  const [levelId, setLevelId] = useState('');
  const router = useRouter();

  // const [recommendationUrl, setRecommendationUrl] = useState('');

  // form submit links to recommended_cocktail page
  // const onSubmit = (event) => {
  //   event.preventDefault();
  //  window.location.href = recommendationUrl;
  // };
  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>get a recommendation {props.user.username}</h1>
        {/* <form onSubmit={onSubmit}> */}
        <div>
          <label>
            flavour
            <input
              data-test-id="flavour-1"
              value={flavourId}
              onChange={(event) => {
                setFlavourId(event.currentTarget.value);
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
              value={spiritId}
              onChange={(event) => {
                setSpiritId(event.currentTarget.value);
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
              value={levelId}
              onChange={(event) => {
                setLevelId(event.currentTarget.value);
              }}
            />{' '}
          </label>
        </div>{' '}
        <br />
        <button
          data-test-id="generate-recommendation"
          type="button"
          onClick={() => {
            router
              .push(
                `/recommendedCocktail/recommendation?flavour=${flavourId}&spirit=${spiritId}&level=${levelId}`,
              )
              .catch(console.log('error'));
          }}
        >
          Get a recommendation
        </button>
        {/* </form> */}
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
