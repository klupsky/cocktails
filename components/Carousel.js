import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const wrapper = css`
  margin-left: 32%;
  margin-right: 32%;

  @media (max-width: 1500px) {
    margin-left: 25%;
    margin-right: 25%;
  }

  // when smaller than 600
  @media (max-width: 600px) {
    margin-left: 10%;
    margin-right: 10%;
  }
`;
const carouselStyle = css`
  .carousel-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .carousel-wrapper {
    display: flex;
    width: 100%;
    position: relative;
  }

  .carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .carousel-content {
    display: flex;
    transition: all 250ms linear;
    -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
    scrollbar-width: none; /* hide scrollbar in Firefox */
  }

  /* hide scrollbar in webkit browser */
  .carousel-content::-webkit-scrollbar,
  .carousel-content::-webkit-scrollbar {
    display: none;
  }

  .carousel-content > * {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .left-arrow,
  .right-arrow {
    position: absolute;
    z-index: 1;
    top: 42%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: transparent;
    border: 2px dotted black;
    padding-top: 0.5%;
  }

  .left-arrow {
    left: 24px;
  }

  .right-arrow {
    right: 24px;
  }
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
    line-height: 100%;
  }
`;

export default function Carousel(props) {
  const { children } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  return (
    <div css={wrapper}>
      <div css={carouselStyle}>
        <div className="carousel-container">
          <div className="carousel-wrapper">
            {currentIndex > 0 && (
              <button onClick={prev} className="left-arrow">
                <Image
                  src="/../../images/components/←.svg"
                  width="30px"
                  height="30px"
                  alt="arrow pointing to previous cocktail"
                />
              </button>
            )}
            <div className="carousel-content-wrapper">
              <div className="carousel-content">
                <div
                  className="carousel-content"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {children}
                </div>
              </div>
            </div>
            {currentIndex < length - 1 && (
              <button onClick={next} className="right-arrow">
                <Image
                  src="/../../images/components/→.svg"
                  width="30px"
                  height="30px"
                  alt="arrow pointing to next cocktail"
                />
              </button>
            )}
          </div>
        </div>
        <div css={link} data-test-id="fullcollection">
          <Link href="/collection">full collection</Link>
        </div>
      </div>
    </div>
  );
}
