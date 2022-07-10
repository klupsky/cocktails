import { css } from '@emotion/react';
import Marquee from 'react-fast-marquee';

const footerStyles = css``;
const cheers = css`
  margin-top: 10px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 800;
  font-size: 140px;
  line-height: 130px;
  color: black;
  /* -webkit-text-stroke: 2px black; */
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <Marquee speed={250} gradient={false}>
        <span css={cheers}>! CHEERS! PROST! SALUTE! CIN CIN </span>
      </Marquee>
    </footer>
  );
}
