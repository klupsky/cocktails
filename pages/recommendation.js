import { css } from '@emotion/react';
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
import { logo, section, smallText, text, wrapper } from './login';

// CSS

const formStyle = css`
  margin-bottom: 10%;
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
    padding-top: 1rem;
    padding-bottom: 1.5rem;
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
      font-size: 0.7rem;
    }
  }
`;
const errorStyles = css`
  color: #e75c3c;
  text-align: center;
  font-size: 0.8rem;
  line-height: 100%;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
  margin-bottom: 10%;
`;
const inputSpirit = css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: space-between;

  a {
    color: black;
  }
  // when smaller than 1200
  @media (max-width: 1200px) {
    justify-content: center;
  }
  // when bigger than 1500
  @media (min-width: 1500px) {
    justify-content: center;
    gap: 0.5rem;
  }
  input[type='radio'] {
    opacity: 0;
    position: absolute;
    background-clip: content-box;
    height: 1.7rem;
    width: 7rem;
  }

  label {
    display: inline-block;
    text-transform: uppercase;
    line-height: 100%;
    background-color: transparent;
    font-size: 16px;
    border: 2px solid black;
    border-radius: 10px;
    height: 1.3rem;
    padding: 5px;
    width: 7rem;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 12rem;
  }

  input:hover {
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    background-color: black;
    color: white;
    border: 2px solid black;
  }
`;

const flavourInputs = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  line-height: 100%;
  gap: 8px;
  a {
    color: black;
  }
  // when bigger than 1500
  @media (min-width: 1500px) {
    justify-content: center;
    gap: 2rem;
  }

  // when smaller than 1200
  @media (max-width: 1200px) {
    justify-content: center;
  }

  input[type='radio'] {
    opacity: 0;
    position: absolute;

    border: 2px solid #000000;
    background-clip: content-box;
    padding: 3px;

    height: 4rem;
    width: 5rem;
  }

  label {
    display: inline-block;
    background-color: transparent;
    padding-top: 27%;
    font-size: 16px;
    border: 2px solid black;
    border-radius: 10%;
    height: 4rem;
    width: 5rem;

    text-transform: uppercase;
    font-size: 0.7rem;
  }

  input:hover {
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    background-color: black;
    color: white;
    border: 2px solid black;
  }
`;

const inputLevel = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  line-height: 100%;
  gap: 8px;
  a {
    color: black;
  }

  // when smaller than 1200
  @media (max-width: 1200px) {
    justify-content: center;
  }
  // when bigger than 1500
  @media (min-width: 1500px) {
    justify-content: center;
    gap: 2rem;
  }

  input[type='radio'] {
    opacity: 0;
    position: absolute;

    border: 2px solid #000000;
    background-clip: content-box;
    padding: 3px;

    height: 2.2rem;
    width: 7rem;
  }

  label {
    display: inline-block;
    background-color: transparent;
    padding-top: 7%;
    font-size: 16px;
    border: 2px solid black;
    border-radius: 50%;

    height: 2.2rem;
    width: 7rem;
    text-transform: uppercase;
    font-size: 0.7rem;
  }

  input:hover {
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    background-color: black;
    color: white;
    border: 2px solid black;
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
  margin-bottom: 3%;

  // when smaller than 1200
  @media (max-width: 1200px) {
    text-align: center;
  }

  // when bigger than 1500
  @media (min-width: 1500px) {
    text-align: center;
  }
`;

export default function Recommendation(props) {
  const [flavourId, setFlavourId] = useState('');
  const [spiritId, setSpiritId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [errors, setErrors] = useState('');
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
          <Link css={logo} href="/">
            <span>
              FANCY A <br />
              COCKTAIL?
            </span>
          </Link>
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
                  <div css={flavourInputs}>
                    {props.flavours.map((flavour) => {
                      return (
                        <span key={flavour.id}>
                          <input
                            type="radio"
                            id="flavourRadio"
                            name="flavour"
                            value={flavour.id}
                          />

                          <label htmlFor={flavour.name}> {flavour.name}</label>
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
                          <input type="radio" name="spirit" value={spirit.id} />
                          <label htmlFor={spirit.name}>{spirit.name}</label>

                          <span className="mark" />
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
                          <input
                            type="radio"
                            name="levelRadio"
                            value={level.id}
                          />
                          <label htmlFor={level.level}>
                            {level.level === 1
                              ? 'LIIIIIGHT'
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
                <button
                  id="disabled recommendation"
                  onClick={() => {
                    setErrors('please pick one of each categories first');
                  }}
                >
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
                    setSpiritId('');
                  }}
                >
                  GET A RECOMMENDATION
                </button>
              )}
            </div>
            <div css={errorStyles}> {errors}</div>
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
