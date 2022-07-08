import Link from 'next/link';

export default function Carousel(props) {
  return (
    <div>
      {props.collectionPreview.map((preview) => {
        return (
          <div key={`cocktailName-${preview.id}`}>
            <Link href={`../collection/${preview.id}`}>{preview.name}</Link>
            {preview.id}
          </div>
        );
      })}
    </div>
  );
}
