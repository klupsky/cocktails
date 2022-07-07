// import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Carousel from '../components/Carousel';
import { getPreviewFromCollectionOfCocktails } from '../util/database';
import { LoginResponseBody } from './api/login';
import { errorStyles } from './register';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Home(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const loginResponseBody: LoginResponseBody = await loginResponse.json();

    // if we have error show an error message
    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return;
    }

    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) &&
      // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      await props.refreshUserProfile();
      await router.push(returnTo);
    } else {
      // redirect user to user profile
      // if you want to use userProfile with username redirect to /users/username
      // await router.push(`/users/${loginResponseBody.user.id}`);
      await props.refreshUserProfile();
      await router.push(`/`);
    }
  }

  return (
    <div>
      <Head>
        <title>do you fancy a cocktail?</title>
        <meta name="description" content="a recommendation guide to cocktails" />
      </Head>
      <main>
        do you
        <h1>fancy a cocktail?</h1>
      </main>

      <Carousel collectionPreview={props.collectionPreview} />
    </div>
  );
}

export async function getServerSideProps() {
  const collectionPreview = await getPreviewFromCollectionOfCocktails();
  // console.log(collectionCocktail);
  return {
    props: {
      collectionPreview,
    },
  };
}
