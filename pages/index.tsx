import { css } from '@emotion/react';
// import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Wave from 'react-wavify';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
import Carousel from '../components/Carousel';
import { getPreviewFromCollectionOfCocktails } from '../util/database';

// import { LoginResponseBody } from './api/login';

// import { errorStyles } from './register';

// CSS

const titleSection = css`
  height: 80vh;
  width: 100vw;
  overflow: hidden;

  text-align: center;
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

    // when smaller than 1000
    @media (max-width: 1000px) {
      font-size: 3rem;
    }

    // when smaller than 600
    @media (max-width: 600px) {
      font-size: 1.7rem;
      margin-top: 12%;
    }
  }
`;

const intro = css`
  background-color: #bbbaf9;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
`;

const wrapper = css`
  margin: 25%;
  // when smaller than 600
  @media (max-width: 600px) {
    margin: 10%;
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

  // when smaller than 600
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

// CSS only on this page

const wave = css`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;

const carousel = css`
  background-color: #fffb89;
  height: 100vh;
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
  };
};

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
        <h1>
          fancy a<br />
          cocktail?
        </h1>
        <div css={wave}>
          <Wave
            fill="#bbbaf9"
            paused={false}
            options={{
              height: 40,
              amplitude: 40,
              speed: 0.4,
              points: 2,
            }}
          />
        </div>
      </main>

      <div css={intro}>
        <div css={wrapper}>
          <div css={text}>
            you're just chillin’ after a hard day in a bar, life is good and you
            feel like a cocktail would add on to this perfect moment ...
          </div>
          <div css={smallText}>but which one is right for you?</div>

          <div css={link}>
            <Link href="/recommendation">find a cocktail</Link>
          </div>
        </div>
      </div>

      <div css={carousel}>
        <Carousel collectionPreview={props.collectionPreview} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const collectionPreview = await getPreviewFromCollectionOfCocktails();
  return {
    props: {
      collectionPreview,
    },
  };
}
