import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  getFlavours,
  getLevels,
  getSpirits,
  getUserByValidSessionToken,
} from '../util/database';

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

  if (!props.user) {
    return (
      <>
        <Head>
          <title>user not found</title>
          <meta name="description" content="user not found" />
        </Head>
        <h1>404 - user not found</h1>
        better luck next time
      </>
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
        <h1>get a recommendation {props.user.username}</h1>
        <div>
          <fieldset
            className="flavour"
            value={flavourId}
            onChange={(event) => handleFlavourChange(event)}
          >
            <div id="flavour">pick a flavour:</div>
            {props.flavours.map((flavour) => {
              return (
                <span key={flavour.id}>
                  <label for={flavour.name}>
                    <input
                      id={flavour.name}
                      type="radio"
                      name="flavour-option"
                      value={flavour.id}
                    />
                    {flavour.name}
                  </label>
                </span>
              );
            })}{' '}
          </fieldset>
        </div>
        <div>
          <fieldset
            className="spirit"
            value={spiritId}
            onChange={(event) => handleSpiritChange(event)}
          >
            <div id="spirit">pick a spirit:</div>
            {props.spirits.map((spirit) => {
              return (
                <span key={spirit.id}>
                  <label for={spirit.name}>
                    <input
                      id={spirit.name}
                      type="radio"
                      name="spirit-option"
                      value={spirit.id}
                    />
                    {spirit.name}
                  </label>
                </span>
              );
            })}
          </fieldset>

          <fieldset
            className="level"
            value={levelId}
            onChange={(event) => handleLevelChange(event)}
          >
            <div id="level">pick an alc level:</div>
            {props.levels.map((level) => {
              return (
                <span key={level.id}>
                  <label for={level.level}>
                    <input
                      type="radio"
                      id={level.level}
                      name="level-option"
                      value={level.id}
                    />
                    {level.level}
                  </label>
                </span>
              );
            })}
          </fieldset>
        </div>
        <br />
        {!flavourId | !spiritId | !levelId ? (
          <button id="disabled recommendation" disabled>
            GET A RECOMMENDATION
          </button>
        ) : (
          <button
            data-test-id="generate-recommendation"
            type="button"
            id="get a recommendation"
            onClick={() => {
              router
                .push(
                  `/recommendedCocktail/recommendation?flavour=${flavourId}&spirit=${spiritId}&level=${levelId}`,
                )
                .catch(console.log('error'));
              setFlavourId('');
              setLevelId('');
              setLevelId('');
            }}
          >
            GET A RECOMMENDATION
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

  const spirits = await getSpirits();
  const levels = await getLevels();
  const flavours = await getFlavours();

  if (user) {
    return {
      props: {
        user: user,
        spirits,
        flavours,
        levels,
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
