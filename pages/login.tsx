import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginResponseBody } from './api/login';
import { errorStyles } from './register';

// CSS

export const logo = css`
  text-align: center;
  font-size: 1rem;
  line-height: 100%;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
  position: relative;
  top: -30px;
  a {
    color: black;
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

export const section = css`
  height: auto;
  width: 100vw;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
`;

export const text = css`
  text-align: center;
`;

export const smallText = css`
  text-align: center;
  text-transform: uppercase;
  margin-top: 3%;
  margin-bottom: 15%;
  font-size: 0.6rem;
  line-height: 100%;
`;

export const wrapper = css`
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 70px;
  margin-bottom: 2%;

  @media (max-width: 1500px) {
    margin-left: 25%;
    margin-right: 25%;
  }

  // when smaller than 600
  @media (max-width: 600px) {
    margin-bottom: 10%;
    margin-left: 5%;
    margin-right: 5%;
  }
`;

// CSS only on this page

const loginBox = css`
  border: 2px solid #000000;
  border-radius: 20px;
  padding: 10%;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 15%;
  font-size: 0.6rem;
  // when smaller than 600
  @media (max-width: 600px) {
    border-top: 2px solid #000000;
    border-bottom: 2px solid #000000;

    padding: 5%;
    font-size: 0.6rem;
  }
`;

const form = css`
  .col-25 {
    float: left;
    width: 25%;
    margin-top: 3%;
    // when smaller than 600
    @media (max-width: 600px) {
      width: 35%;
    }
  }

  .col-75 {
    float: left;
    width: 75%;
    margin-top: 3%;
    // when smaller than 600

    @media (max-width: 600px) {
      width: 65%;
    }

    input {
      background-color: transparent;
      border: 0;
      border-bottom: 2px dotted #000;
      width: 100%;
      font-size: 1rem;
      -webkit-text-size-adjust: 100%;
      font-family: var(--typeBasePrimary);
      font-weight: var(--typeBaseWeight);
      font-style: var(--typeBaseStyle);
      letter-spacing: var(--typeBaseSpacing);
      line-height: var(--typeBaseLineHeight);
      display: inline-block;
      text-align: start;
      // when smaller than 600

      @media (max-width: 600px) {
        width: 90%;
      }
    }
  }

  button {
    color: black;
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    margin-top: 10%;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Messapia';
    letter-spacing: 0px;
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    // when smaller than 600
    @media (max-width: 600px) {
      margin-top: 12%;
    }
  }

  .register {
    margin-top: 2%;
    text-decoration-line: underline;
    text-underline-position: under;
    // when smaller than 600
    @media (max-width: 600px) {
      margin-top: 3%;
      margin-bottom: 5%;
    }
  }
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};
export default function Login(props: Props) {
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
      await router.push(`/users/${loginResponseBody.user.id}`);
    }
  }

  return (
    <div>
      <Head>
        <title>login</title>
        <meta name="description" content="login as existing user" />
      </Head>

      <main>
        <div css={logo}>
          <Link href="/" css={logo}>
            <span>
              FANCY A <br />
              COCKTAIL?
            </span>
          </Link>
        </div>

        <div css={section}>
          <div css={wrapper}>
            <div css={text}>please register in order to get full access!</div>
            <div css={smallText}>you are going to love it!</div>
            <div css={loginBox}>
              <div css={form}>
                <div className="col-25">
                  <label htmlFor="username">username:</label>
                </div>
                <div className="col-75">
                  <input
                    id="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.currentTarget.value);
                    }}
                  />
                </div>
                <div className="col-25">
                  <label htmlFor="password">password:</label>
                </div>
                <div className="col-75">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                    }}
                  />
                </div>
                <div>
                  <button
                    className="buttonLogin"
                    onClick={() => loginHandler()}
                  >
                    Login
                  </button>
                </div>
                <div className="register">
                  {' '}
                  <Link href="/register">or register</Link>
                </div>
                {errors.map((error) => (
                  <div css={errorStyles} key={`error-${error.message}`}>
                    {error.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
