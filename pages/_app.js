import './index.css';
import { css, Global } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  // set the user cookie in order to pass it to the components / prop drill
  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');

    const profileResponseBody = await profileResponse.json();

    if (!('errors' in profileResponseBody)) {
      setUser(profileResponseBody.user);
    } else {
      profileResponseBody.errors.forEach((error) => console.log(error.message));
      setUser(undefined);
    }
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            font-family: 'Apfel';
            font-size: 23px;
            line-height: 33px;
            letter-spacing: 0.07em;
            width: 100%;
            align-items: center;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            width: 100%;
            height: 100%;
            margin: 0;
            scroll-behavior: smooth;

            a {
              text-decoration: none;
              color: #000000;
              text-transform: uppercase;
              cursor: pointer;
            }
            a:hover {
              cursor: pointer;
            }
            button {
              cursor: pointer;
            }
            li {
              list-style-type: none;
            }
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        `}
      />

      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}
