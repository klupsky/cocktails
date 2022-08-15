import Image from 'next/image';

export default function EmptyStar() {
  return (
    <div>
      <Image
        src="/../../images/components/star1.svg"
        width="25px"
        height="25px"
        alt="one star empty"
      />
    </div>
  );
}
