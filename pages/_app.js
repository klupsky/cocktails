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
            font-family: 'Syne';
            font-style: normal;
            font-weight: 500;
            font-size: 30px;
            line-height: 40px;
            letter-spacing: 0.07em;
            background: #ffffff;
            width: 100%;
            align-items: center;
            a {
              text-decoration: none;
              color: #000000;
              text-transform: uppercase;
            }
            li {
              list-style-type: none;
            }
          }

          * {
            box-sizing: border-box;
            margin: 0;
          }
        `}
      />

      <Layout user={user}>
        {/*
          The "Component" component refers to
          the current page that is being rendered
        */}
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}
