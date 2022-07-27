import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

const navigationOpen = css`
  z-index: 10;
  position: relative;
  position: fixed;
  background: #e75c3c;
  height: 100vh;
  width: 100vw;
`;

const mainNavigation = css`
  text-align: center;
  line-height: 130%;
  margin-top: 15%;
  padding: 0;

  button {
    color: black;
    font-size: 2rem;
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    align-items: center;
    text-align: center;
    font-family: 'Messapia';
    letter-spacing: 0px;
    text-transform: uppercase;
    font-size: 2.8rem;
    letter-spacing: 0em;
    margin-top: 0;
    // when smaller than 1000
    @media (max-width: 1000px) {
      font-size: 1.5rem;
    }

    // when smaller than 600
    @media (max-width: 600px) {
      font-size: 1rem;
    }

    a {
      color: black;
    }
    :hover {
      cursor: pointer;
    }
  }
  // when smaller than 1000
  @media (max-width: 1000px) {
    margin-top: 20%;
  }
  // when smaller than 600
  @media (max-width: 600px) {
    margin-top: 35%;
  }
`;

const logo = css`
  text-align: center;
  z-index: 11;

  button {
    z-index: 11;

    color: black;
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    font-size: 1rem;
    line-height: 100%;
    font-family: 'Messapia';
    letter-spacing: 0px;
    text-transform: uppercase;
    position: relative;
    top: 67px;

    a {
      color: black;
    }
    :hover {
      cursor: pointer;
    }
    a:hover {
      cursor: pointer;
    }
    // when smaller than 600
    @media (max-width: 600px) {
      font-size: 0.7rem;
      line-height: 100%;
    }
  }
`;

const smallNavigation = css`
  text-align: center;
  margin-top: 11%;

  // when smaller than 1000
  @media (max-width: 1000px) {
    margin-top: 18%;
  }

  // when smaller than 600

  @media (max-width: 600px) {
    margin-top: 50%;
  }

  button {
    color: black;
    font-size: 1rem;
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    align-items: center;
    text-align: center;

    text-transform: uppercase;
    font-family: 'Apfel';
    line-height: 140%;
    letter-spacing: 0.07em;
    margin-top: 0;

    // when smaller than 600
    @media (max-width: 600px) {
      font-size: 1rem;
    }

    a {
      color: black;
    }
    :hover {
      cursor: pointer;
    }
  }
`;

const openclose = css`
  z-index: 11;
  position: fixed;
  text-align: right;
  background: transparent;
  margin: 0;
  width: 100vw;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
  font-size: 0.9rem;
  line-height: 10%;

  button {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    align-items: center;
    text-align: center;
    height: 5rem;
    width: 2.2rem;
    background: #e75c3c;
    cursor: pointer;
    position: relative;
  }

  span {
    top: 0px;
    left: 0.4rem;
    margin: 0px;
    height: 2px;
    width: 30px;
    background-color: black;
    position: relative;
    display: block;
    transition: all 0.2s ease-in-out;
    position: relative;
    z-index: 12;

    &:before {
      top: -8px;
      visibility: visible;
    }
    &:after {
      top: 8px;
    }
    &:before,
    &:after {
      height: 2px;
      width: 30px;
      background-color: black;
      position: absolute;
      display: block;
      content: '';
    }
  }

  .close {
    position: relative;
    z-index: 0;

    span {
      background: transparent;

      &:before {
        transform: rotate(45deg) translate(5px, 5px);
      }
      &:after {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    }
  }
`;

export default function Header(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  // function to close nav bar onClick of links
  function closeMenu() {
    setNavbarOpen(false);
    console.log('is this onclick doing anything?');
  }
  return (
    <div>
      {navbarOpen ? (
        <div css={navigationOpen}>
          <div css={openclose}>
            <div className="close">
              <button onClick={handleToggle}>
                <span />
              </button>
            </div>
          </div>

          <div css={logo}>
            <button onClick={() => closeMenu()}>
              <Link href="/">
                <span>
                  FANCY A <br />
                  COCKTAIL?
                </span>
              </Link>
            </button>
          </div>

          <div css={mainNavigation}>
            <button onClick={() => closeMenu()} data-test-id="recommendation">
              <Link href="/recommendation">find a cocktail</Link>
            </button>

            <br />
            <button data-test-id="collection" onClick={() => closeMenu()}>
              <Link href="/collection">full collection</Link>{' '}
            </button>

            <br />
            {props.user && (
              <button onClick={() => closeMenu()}>
                <Link href={`/users/${props.user.id}`}>your selection</Link>{' '}
              </button>
            )}
            <br />
          </div>
          {props.user ? (
            <div css={smallNavigation}>
              <Anchor href="/logout">Logout</Anchor>
              <br />
              <button onClick={() => closeMenu()}>
                <Link href="/imprint">imprint</Link>{' '}
              </button>
            </div>
          ) : (
            <div css={smallNavigation}>
              {/* <Link href="/register">Register</Link> */}
              <button onClick={() => closeMenu()}>
                <Link href="/login">Login</Link>&nbsp;|&nbsp;
              </button>
              <button onClick={() => closeMenu()}>
                {' '}
                <Link href="register">Register</Link>{' '}
              </button>
              <br />
              <button onClick={() => closeMenu()} data-test-id="imprint">
                <Link href="/imprint">Imprint</Link>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div css={openclose}>
          <div className="open">
            <button data-test-id="menu" onClick={handleToggle}>
              <span />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
