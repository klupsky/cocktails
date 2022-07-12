import { css } from '@emotion/react';
import Head from 'next/head';

const imprintStyle = css`
  width: 100vw;
  height: 85vh;
  background-color: black;
  color: #ffffff;
  overflow: hidden;
  z-index: 1;
  background-color: black;
  position: relative;
  margin-top: -150px;
  // when smaller than 600
  @media (max-width: 600px) {
    height: 100vh;
  }
`;

const logoWhite = css`
  text-align: center;
  font-size: 1rem;
  line-height: 100%;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
  position: relative;
  top: -30px;
  color: #ffffff;
  z-index: 2;

  // when smaller than 600
  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 100%;
  }
`;
const text = css`
  text-align: center;
  color: white;
  position: relative;
`;

const smallText = css`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 14%;
  font-size: 0.6rem;
  line-height: 100%;
  color: white;

  // when smaller than 1000
  @media (max-width: 1000px) {
    margin-top: 200px;
    margin-bottom: 20%;
  }
`;

const smallTextTwo = css`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 10%;
  margin-top: 20%;
  font-size: 0.6rem;
  line-height: 100%;
  color: white;
  line-height: 1rem;

  // when smaller than 600
  @media (max-width: 600px) {
    margin-top: 40%;
    margin-bottom: 13%;
  }

  a {
    color: white;

    text-decoration-line: underline;
    text-underline-position: under;
  }
`;

export const wrapper = css`
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 15%;
  margin-bottom: 10%;

  // when smaller than 600
  @media (max-width: 600px) {
    margin-top: 13%;
    margin-bottom: 10%;
    margin-left: 5%;
    margin-right: 5%;
  }
`;

export default function Imprint() {
  return (
    <div>
      <Head>
        <title>imprint</title>
        <meta name="description" content="imprint: katharina chalupsky" />
      </Head>

      <main>
        <div css={logoWhite}>
          fancy a<br />
          cocktail?
        </div>

        <div css={imprintStyle}>
          <div css={wrapper}>
            <div css={smallText}>imprint</div>

            <div css={text}>
              created by <br />
              katharina chalupsky <br />
              <br />© 2022
            </div>

            <div css={smallTextTwo}>
              thank you{' '}
              <a
                href="http://www.upleveled.io"
                target="_blank"
                rel="noreferrer noopener"
              >
                upleveled
              </a>{' '}
              and{' '}
              <a
                href="http://www.mirandabar.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                miranda bar
              </a>{' '}
              for your ♥ and expertise!
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
