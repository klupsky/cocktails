import { css } from '@emotion/react';
import Head from 'next/head';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  getFlavours,
  getLevels,
  getSpirits,
  getUserByValidSessionToken,
} from '../util/database';
import { logo, section, smallText, text, wrapper } from './login';

// CSS

const formStyle = css`
  margin-bottom: 15%;
  border-bottom: 2px dotted #000;
  border-top: 2px dotted #000;

  fieldset {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border-left: 0px solid transparent;
    border-right: 0px solid transparent;
    border-top: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    border-bottom: 2px dotted #000;
    padding: 1rem;
  }

  button {
    color: black;
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    margin-bottom: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Messapia';
    letter-spacing: 0px;
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;

    // when smaller than 1000
    @media (max-width: 1000px) {
      margin-top: 0rem;
      font-size: 0.9rem;
    }
    // when smaller than 600
    @media (max-width: 600px) {
      margin-top: 0rem;
      font-size: 0.6rem;
    }
  }
`;

const inputFlavour = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  text-transform: uppercase;
  font-size: 0.6rem;
  line-height: 100%;
  gap: 8px;

  label > input[type='radio'] {
    display: none;
  }

  label > input[type='radio'] {
    display: inline-block;
    vertical-align: bottom;
    margin-right: 0.3rem;
    border-radius: 50%;
    border-color: black;
    border: 2px solid;
    cursor: pointer;
    height: 1.2rem;
    width: 1.2rem;
  }
`;

const inputSpirit = css`
  display: grid;
  grid-template-columns: auto auto auto;
  text-transform: uppercase;
  font-size: 0.6rem;
  line-height: 100%;
  text-align: left;
  gap: 8px;

  // when smaller than 900
  @media (max-width: 900px) {
    grid-template-columns: auto auto;
  }

  label > input[type='radio'] {
    display: none;
  }

  label > input[type='radio'] {
    display: inline-block;
    vertical-align: bottom;
    margin-right: 0.3rem;
    border-radius: 50%;
    border-color: black;
    border: 2px solid;
    cursor: pointer;
    height: 1.2rem;
    width: 1.2rem;
  }
`;

const inputLevel = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  text-transform: uppercase;
  font-size: 0.6rem;
  line-height: 100%;
  gap: 8px;

  label > input[type='radio'] {
    display: none;
  }

  label > input[type='radio'] {
    display: inline-block;
    vertical-align: bottom;
    margin-right: 0.3rem;
    border-radius: 50%;
    border-color: black;
    border: 2px solid;
    cursor: pointer;
    height: 1.2rem;
    width: 1.2rem;
  }
`;

const category = css`
  text-align: left;
  text-transform: uppercase;
  font-family: 'Messapia';
  letter-spacing: 0px;
  font-style: normal;
  font-weight: 700;
  font-size: 0.7rem;
  margin-bottom: 5%;
`;

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

        <div css={section}>
          <div css={wrapper}>
            <div css={text}>404 - user not found</div>
            <div css={smallText}> better luck next time</div>{' '}
          </div>
        </div>
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
        <div css={logo}>
          <a href="/">
            <span>
              FANCY A <br />
              COCKTAIL?
            </span>
          </a>
        </div>
        <div css={section}>
          <div css={wrapper}>
            <div css={text}>
              hey {props.user.username}, what kind of cocktail do you feel like?
            </div>
            <div css={smallText}>select one preference of each category!</div>

            <div css={formStyle}>
              <div>
                <fieldset
                  className="flavour"
                  value={flavourId}
                  onChange={(event) => handleFlavourChange(event)}
                >
                  <div id="flavour" css={category}>
                    flavour
                  </div>

                  <div css={inputFlavour}>
                    {props.flavours.map((flavour) => {
                      return (
                        <span key={flavour.id}>
                          <label htmlFor={flavour.name}>
                            <input
                              type="radio"
                              className="flavour"
                              name="flavour-option"
                              value={flavour.id}
                            />
                            {flavour.name}
                          </label>
                        </span>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
              <div>
                <fieldset
                  className="spirit"
                  value={spiritId}
                  onChange={(event) => handleSpiritChange(event)}
                >
                  <div id="spirit" css={category}>
                    spirit
                  </div>
                  <div css={inputSpirit}>
                    {props.spirits.map((spirit) => {
                      return (
                        <span key={spirit.id}>
                          <label htmlFor={spirit.name}>
                            <input
                              type="radio"
                              name="spirit-option"
                              value={spirit.id}
                            />
                            {spirit.name}
                          </label>
                        </span>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset
                  className="level"
                  value={levelId}
                  onChange={(event) => handleLevelChange(event)}
                >
                  <div id="level" css={category}>
                    vol. %
                  </div>
                  <div css={inputLevel}>
                    {props.levels.map((level) => {
                      return (
                        <span key={level.id}>
                          <label htmlFor={level.level}>
                            <input
                              type="radio"
                              name="level-option"
                              value={level.id}
                            />

                            {level.level === 1
                              ? 'LOOOOOW'
                              : level.level === 2
                              ? 'NIIIIICE'
                              : 'STROOOOONG'}
                          </label>
                        </span>
                      );
                    })}
                  </div>
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
            </div>
          </div>
        </div>
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
