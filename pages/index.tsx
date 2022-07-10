import { css } from '@emotion/react';
// import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
import Carousel from '../components/Carousel';
import { getPreviewFromCollectionOfCocktails } from '../util/database';

// import { LoginResponseBody } from './api/login';

// import { errorStyles } from './register';

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

const titleSection = css`
  height: 100vh;
  width: 100vw;
  text-align: center;
  .doYou {
    margin-top: 8%;
  }
  h1 {
    margin-top: 7%;
    /* font-size: 4.3rem;
    line-height: 3.5rem;
    font-weight: 800;

    text-transform: uppercase; */
  }
  // when smaller than 470
  /* @media (max-width: 800px) { */
  /* height: 100vh;
    width: 100vw; */

  /* .doYou { */
  /* margin-top: 28%;
      font-size: 7vw; */
  /* }
    h1 { */
  /* margin-top: 10%;
      font-size: 15vw;
      line-height: 90%;
      text-transform: uppercase; */
  /* } */
  /* } */
`;

const intro = css`
  background-color: #bbbaf9;
  height: 100vh;

  .doYou {
    margin-top: 30%;
  }
  // when smaller than 470
  @media (max-width: 470px) {
    .doYou {
    }
  }
`;

const carousel = css`
  background-color: #fffb89;
  height: 100vh;
`;

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
      </main>
      <div css={intro}>hey</div>

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
