import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
        <title>Login</title>
        <meta name="login" content="Login a new user" />
      </Head>
      <h1>Login</h1>
      <label>
        username:{' '}
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value);
          }}
        />
      </label>
      <label>
        password:{' '}
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </label>
      <button onClick={() => loginHandler()}>Login</button>
      <Link href="/register">or register</Link>
      {errors.map((error) => (
        <div css={errorStyles} key={`error-${error.message}`}>
          {error.message}
        </div>
      ))}
      <main></main>
    </div>
  );
}
