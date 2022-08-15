import Image from 'next/image';

export default function RatingStarThree() {
  return (
    <div>
      <Image
        src="/../../images/components/star2.svg"
        width="20px"
        height="20px"
        alt="one star filled"
      />{' '}
      <Image
        src="/../../images/components/star2.svg"
        width="20px"
        height="20px"
        alt="one star filled"
      />{' '}
      <Image
        src="/../../images/components/star2.svg"
        width="20px"
        height="20px"
        alt="one star filled"
      />{' '}
      <Image
        src="/../../images/components/star1.svg"
        width="20px"
        height="20px"
        alt="one star empty"
      />{' '}
      <Image
        src="/../../images/components/star1.svg"
        width="20px"
        height="20px"
        alt="one star empty"
      />
    </div>
  );
}
