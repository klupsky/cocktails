import { css } from '@emotion/react';

const header = css`
  background: transparent;
  margin: 0;
  width: 100vw;

  font-family: 'Messapia';
  text-transform: uppercase;
  font-size: 1rem;
  line-height: 90%;

  height: 4.8em;
`;

const logo = css`
  margin-top: 70px;
  text-align: center;
  font-size: 1rem;
  line-height: 90%;

  // when smaller than 600
  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 90%;
  }
`;

const navigation = css`
  @keyframes bugfix {
    from {
      padding: 0;
    }
    to {
      padding: 0;
    }
  }
  @-webkit-keyframes bugfix {
    from {
      padding: 0;
    }
    to {
      padding: 0;
    }
  }

  #overlay-button {
    position: fixed;
    right: 0em;
    top: 0em;
    height: 4.8em;
    width: 1.8em;
    background: #e75c3c;
    z-index: 5;
    cursor: pointer;
    user-select: none;
    span {
      position: fixed;
      top: 40%;
      margin: 19%;
      height: 2px;
      width: 30px;
      background-color: black;
      position: relative;
      display: block;
      transition: all 0.2s ease-in-out;
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
        content: '';
        transition: all 0.2s ease-in-out;
      }
    }
  }

  input[type='checkbox'] {
    display: none;

    &:checked ~ #overlay {
      visibility: visible;
    }

    &:checked ~ #overlay-button {
      &:hover span,
      span {
        background: transparent;
      }
      span {
        &:before {
          transform: rotate(45deg) translate(5px, 5px);
        }
        &:after {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      }
    }
  }

  #overlay {
    height: 100vh;
    width: 100vw;
    background: #e75c3c;
    z-index: 2;
    visibility: hidden;
    position: fixed;

    &.active {
      visibility: visible;
    }

    ul {
      margin-top: 45%;
      align-items: center;
      text-align: center;
      height: 100vh;
      padding: 0;
      list-style-type: none;
      li {
        font-family: 'Messapia';
        text-transform: uppercase;
        font-size: 2.8rem;
        line-height: 90%;
        letter-spacing: 0em;
        margin-top: 1%;
        // when smaller than 1000
        @media (max-width: 1000px) {
          font-size: 1.5rem;
        }

        // when smaller than 600
        @media (max-width: 600px) {
          font-size: 1rem;
        }

        a {
          &:hover {
          }
        }
      }
    }
  }
`;

export default function Header(props) {
  return (
    <header css={header}>
      <div css={navigation}>
        <input type="checkbox" id="overlay-input" />
        <label htmlFor="overlay-input" id="overlay-button">
          <span></span>
        </label>

        <div id="overlay">
          <div css={logo}>
            <a href="/">
              <span>
                FANCY A <br />
                COCKTAIL?
              </span>
            </a>
          </div>

          <div>
            <ul>
              <li>
                <a href="/recommendation">
                  <span>find a cocktail</span>
                </a>
              </li>

              <li>
                <a href="/collection">
                  <span>full collection</span>
                </a>
              </li>

              {props.user && (
                <li>
                  <a href={`/users/${props.user.id}`}>
                    <span>your selection</span>
                  </a>
                </li>
              )}

              {props.user ? (
                <a href="/logout">
                  <li>
                    <span>Logout</span>
                  </li>
                </a>
              ) : (
                <div
                  css={css`
                    font-family: 'Apfel';
                    font-size: 25px;
                    line-height: 35px;
                  `}
                >
                  {/* <Link href="/register">Register</Link> */}

                  <li>
                    <a href="/login">
                      <span
                        css={css`
                          font-family: 'Apfel';
                          font-size: 1rem;
                          letter-spacing: 0.07em;
                        `}
                      >
                        Login
                      </span>
                    </a>
                    <span
                      css={css`
                        font-family: 'Apfel';
                        font-size: 1rem;
                        letter-spacing: 0.07em;
                      `}
                    >
                      /
                    </span>
                    <a href="/register">
                      <span
                        css={css`
                          font-family: 'Apfel';
                          font-size: 1rem;
                          letter-spacing: 0.07em;
                        `}
                      >
                        Register
                      </span>
                    </a>
                  </li>
                  <a href="/imprint">
                    <li>
                      <span
                        css={css`
                          font-family: 'Apfel';
                          font-size: 1rem;
                          letter-spacing: 0.07em;
                        `}
                      >
                        Imprint
                      </span>
                    </li>
                  </a>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
