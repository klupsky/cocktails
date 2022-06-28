import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getUserByValidSessionToken } from '../util/database';

export default function Recommendation(props) {
  const [flavourId, setFlavourId] = useState('');
  const [spiritId, setSpiritId] = useState('');
  const [levelId, setLevelId] = useState('');
  const router = useRouter();

  function handleFlavourChange(event) {
    setFlavourId(event.target.value);
  }
  function handleSpiritChange(event) {
    setSpiritId(event.target.value);
  }
  function handleLevelChange(event) {
    setLevelId(event.target.value);
  }

  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>get a recommendation {props.user.username}</h1>
        <div>
          <span id="flavour">pick a flavour:</span>
          <form name="flavour">
            <fieldset
              className="flavour"
              value={flavourId}
              onChange={(event) => handleFlavourChange(event)}
            >
              <label for="flavourId1">
                <input type="radio" name="flavour-option" value="1" />
                flavourId1
              </label>
              <label for="flavourId2">
                <input type="radio" name="flavour-option" value="2" />
                flavourId2
              </label>
            </fieldset>
          </form>

          <span id="spirit">pick a spirit:</span>
          <fieldset
            className="spirit"
            value={spiritId}
            onChange={(event) => handleSpiritChange(event)}
          >
            <label for="spiritId1">
              <input type="radio" name="spirit-option" value="1" />
              spiritId1
            </label>
            <label for="spiritId2">
              <input type="radio" name="spirit-option" value="2" />
              spiritId1
            </label>
          </fieldset>
          <span id="spirit">pick an alc level:</span>
          <fieldset
            className="level"
            value={levelId}
            onChange={(event) => handleLevelChange(event)}
          >
            <label for="levelId1">
              <input type="radio" name="level-option" value="1" required />
              levelId1
            </label>
            <label for="levelId2">
              <input type="radio" name="level-option" value="2" />
              levelId2
            </label>
            <label for="levelId3">
              <input type="radio" name="level-option" value="3" />
              levelId3
            </label>
          </fieldset>
        </div>
        <br />
        {!flavourId | !spiritId | !levelId ? (
          <button disabled>Get a recommendation</button>
        ) : (
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
        )}
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
