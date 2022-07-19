import { css } from '@emotion/react';
// import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Wave from 'react-wavify';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
import Carousel from '../components/Carousel';
import { getPreviewFromCollectionOfCocktails } from '../util/database';

// import { LoginResponseBody } from './api/login';

// CSS

const titleSection = css`
  height: 600px;
  width: 100vw;
  overflow: hidden;
  text-align: center;

  @media (max-width: 1000px) {
    height: 500px;
  }

  // when bigger than 15000
  @media (min-width: 1500px) {
    height: 900px;
  }

  .doYou {
    text-transform: uppercase;
    margin-top: 3.5%;
    // when smaller than 1000
    @media (max-width: 1000px) {
      margin-top: 10%;
    }
    // when smaller than 600
    @media (max-width: 600px) {
      margin-top: 17%;
    }
  }
  h1 {
    font-family: 'Messapia';
    text-transform: uppercase;
    font-size: 4.5rem;
    line-height: 100%;
    letter-spacing: 0em;
    margin-top: 8%;

    // when bigger than 15000
    @media (min-width: 1500px) {
      font-size: 7rem;
      margin-top: 7%;
    }

    // when smaller than 1000
    @media (max-width: 1000px) {
      font-size: 3rem;
    }

    // when smaller than 600
    @media (max-width: 570px) {
      font-size: 1.7rem;
      margin-top: 12%;
    }
  }

  .wave {
    position: absolute;
    width: 100%;
    top: 600px;
    left: 0;

    // when smaller than 1000
    @media (max-width: 1000px) {
      top: 500px;
    }

    // when bigger than 15000
    @media (min-width: 1500px) {
      top: 900px;
    }
  }
`;

const intro = css`
  background-color: #bbbaf9;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  @media (max-width: 1000px) {
    height: 700px;
  }

  // when bigger than 15000
  @media (min-width: 1500px) {
    height: 1100px;
  }
`;

const wrapper = css`
  margin: 32%;

  @media (max-width: 1500px) {
    margin: 25%;
  }

  // when smaller than 600
  @media (max-width: 600px) {
    margin: 10%;
  }

  .cherryStyle {
    transform: rotate(-15deg);
    text-align: right;
    position: relative;
    top: -280px;
    // when smaller than 1400
    @media (max-width: 1400px) {
      position: relative;
      top: -270px;
    }

    // when smaller than 1000
    @media (max-width: 1000px) {
      position: relative;
      top: -190px;
    }

    // when smaller than 600
    @media (max-width: 600px) {
      position: relative;
      top: -150px;
    }

    // when bigger than 15000
    @media (min-width: 1500px) {
      position: relative;
      top: -420px;
    }

    .swing {
      -webkit-transform-origin: top center;
      -ms-transform-origin: top center;
      transform-origin: top center;
      -webkit-animation-name: swing;
      animation-name: swing;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    -webkit-transform-origin: top center;
    -ms-transform-origin: top center;
    transform-origin: top center;
    -webkit-animation-name: swing;
    animation-name: swing;
    -webkit-animation-duration: 15s;
    animation-duration: 15s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
  }

  @-webkit-keyframes swing {
    20% {
      -webkit-transform: rotate3d(0, 0, 1, 10deg);
      transform: rotate3d(0, 0, 1, 10deg);
    }
    40% {
      -webkit-transform: rotate3d(0, 0, 1, -10deg);
      transform: rotate3d(0, 0, 1, -10deg);
    }
    60% {
      -webkit-transform: rotate3d(0, 0, 1, 8deg);
      transform: rotate3d(0, 0, 1, 8deg);
    }
    80% {
      -webkit-transform: rotate3d(0, 0, 1, -10deg);
      transform: rotate3d(0, 0, 1, -10deg);
    }
    /* 100% {
      -webkit-transform: rotate3d(0, 0, 1, 8deg);
      transform: rotate3d(0, 0, 1, 8deg);
    } */
  }

  @keyframes swing {
    20% {
      -webkit-transform: rotate3d(0, 0, 1, 10deg);
      transform: rotate3d(0, 0, 1, 10deg);
    }
    40% {
      -webkit-transform: rotate3d(0, 0, 1, -10deg);
      transform: rotate3d(0, 0, 1, -10deg);
    }
    60% {
      -webkit-transform: rotate3d(0, 0, 1, 8deg);
      transform: rotate3d(0, 0, 1, 8deg);
    }
    80% {
      -webkit-transform: rotate3d(0, 0, 1, -10deg);
      transform: rotate3d(0, 0, 1, -10deg);
    }
    /* 100% {
      -webkit-transform: rotate3d(0, 0, 1, 8deg);
      transform: rotate3d(0, 0, 1, 8deg);
    } */
  }
`;

const text = css`
  text-align: center;
`;
const smallText = css`
  text-align: center;
  text-transform: uppercase;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  font-size: 0.6rem;
  line-height: 100%;
`;

const link = css`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Messapia';
  letter-spacing: 0px;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  border-top: 2px dotted #000;
  border-bottom: 2px dotted #000;
  padding: 4%;

  // when smaller than 700
  @media (max-width: 700px) {
    font-size: 0.9rem;
    margin-bottom: 4rem;
  }
`;

// CSS only on this page

const carousel = css`
  background-color: #fffb89;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1000px) {
    height: 700px;
  }

  // when bigger than 15000
  @media (min-width: 1500px) {
    height: 1100px;
  }

  .carouselInsideStyle {
    text-align: center;
    :hover {
      cursor: pointer;
    }

    .cocktailNameStyle {
      margin-bottom: 2rem;
      margin-top: 0.5rem;
    }
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
`;
const ellipsePosition = css`
  position: relative;
  transform: rotate(-15deg);
  top: -7.5rem;
  left: -2rem;

  // when smaller than 1000
  @media (max-width: 1000px) {
    left: -0.5rem;
    top: -5rem;
  }
`;

// TYPES

type Props = {
  // refreshUserProfile: () => Promise<void>;

  collectionPreview: {
    id: number;
    name: string;
    level: number;
    levelid: number;
    flavourid: number;
    flavour: string;
    spirit: string;
    spiritid: number;
    description: string;
    glass: string;
    method: string;
    garnish: string;
    category: string;
    categoryid: number;
  }[];
};

// FUNCTIONALITY STARTS HERE

export default function Home(props: Props) {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState<
  //   {
  //     message: string;
  //   }[]
  // >([]);
  // const router = useRouter();

  // async function loginHandler() {
  //   const loginResponse = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //   });

  // const loginResponseBody: LoginResponseBody = await loginResponse.json();

  // if we have error show an error message
  // if ('errors' in loginResponseBody) {
  //   setErrors(loginResponseBody.errors);
  //   return;
  // }

  // const returnTo = router.query.returnTo;

  // if (
  //   returnTo &&
  //   !Array.isArray(returnTo) &&
  //   // Security: Validate returnTo parameter against valid path
  //   // (because this is untrusted user input)
  //   /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
  // ) {
  //   await props.refreshUserProfile();
  //   await router.push(returnTo);
  // } else {
  // redirect user to user profile
  // if you want to use userProfile with username redirect to /users/username
  // await router.push(`/users/${loginResponseBody.user.id}`);
  //     await props.refreshUserProfile();
  //     await router.push(`/`);
  //   }
  // }

  return (
    <>
      <Head>
        <title>do you fancy a cocktail?</title>
        <meta
          name="description"
          content="a recommendation guide to cocktails"
        />
      </Head>
      <main css={titleSection}>
        <div className="doYou">do you</div>
        <h1>fancy a cocktail?</h1>
        <div className="wave">
          <Wave
            fill="#bbbaf9"
            paused={false}
            options={{
              height: 15,
              amplitude: 30,
              speed: 0.4,
              points: 2,
            }}
          />
        </div>
      </main>
      <div css={intro}>
        <div css={wrapper}>
          <div className="cherryStyle">
            <Image
              src="/../images/components/cherry.svg"
              alt="{preview.name}"
              width="160px"
              height="160px"
            />
          </div>

          <div css={ellipsePosition}>
            <div css={ellipse}>
              <div>sure you do!</div>
            </div>{' '}
          </div>

          <div css={text}>
            you are chillin’ after a hard day in a bar, life is good and you
            feel like a cocktail would add on to this perfect moment ...
          </div>
          <div css={smallText}>but which one is right for you?</div>

          <div css={link} data-test-id="login">
            <Link href="/recommendation">find a cocktail</Link>
          </div>
        </div>
      </div>
      {/* {console.log(props.collectionPreview)} */}
      <div css={carousel}>
        <Carousel>
          {/* {console.log(props.collectionPreview)} */}
          {props.collectionPreview.map((preview) => {
            return (
              <div
                className="carouselInsideStyle"
                key={`cocktailid-${preview.id}`}
              >
                <div>
                  <Link href={`/../collection/${preview.id}`}>
                    <Image
                      src={`/../images/cocktail/${preview.id}.svg`}
                      alt="{preview.name}"
                      width="300px"
                      height="300px"
                    />
                  </Link>
                </div>
                <div className="cocktailNameStyle">
                  <Link href={`/../collection/${preview.id}`}>
                    {preview.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const collectionPreview = await getPreviewFromCollectionOfCocktails();
  return {
    props: {
      collectionPreview: collectionPreview,
    },
  };
}
