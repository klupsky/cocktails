import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

// CSS

const imprintStyle = css`
  width: 100vw;
  height: 85vh;
  background-color: white;
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
  a {
    color: white;
  }
  :hover {
    cursor: pointer;
  }

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
    margin-bottom: 20%;
  }
`;

const smallTextTwo = css`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 30%;
  margin-top: 15%;
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
  margin-top: 200px;
  margin-bottom: 10%;

  // when smaller than 600
  @media (max-width: 600px) {
    margin-bottom: 10%;
    margin-left: 5%;
    margin-right: 5%;
  }
`;

export const ellipse = css`
  border-radius: 50%;
  height: 2.2rem;
  width: 7rem;
  color: black;
  background-color: white;
  font-size: 0.7rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 0;
  text-transform: uppercase;
  :hover {
    cursor: pointer;
  }
`;
const ellipsePosition = css`
  position: relative;
  transform: rotate(-15deg);
  top: -3.5rem;

  // when smaller than 1000
  @media (max-width: 1000px) {
    left: -0.5rem;
    top: -2rem;
  }
`;

// FUNCTIONALITY STARTS HERE

export default function Imprint() {
  return (
    <div>
      <Head>
        <title>imprint</title>
        <meta name="description" content="imprint: katharina chalupsky" />
      </Head>

      <main>
        <div css={logoWhite}>
          <Link href="/" css={logoWhite}>
            <span>
              FANCY A <br />
              COCKTAIL?
            </span>
          </Link>
          <br />
        </div>
        <div css={imprintStyle}>
          <div css={wrapper}>
            <div css={smallText}>imprint</div>
            <Link href="mailto:katharina@chalupsky.eu">
              <div css={ellipsePosition}>
                <div css={ellipse}>contact</div>
              </div>
            </Link>
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
