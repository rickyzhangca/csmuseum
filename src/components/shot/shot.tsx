import Image from 'next/image';

type ShotProps = {
  src: string;
  alt: string;
};

export const Shot = ({ src, alt }: ShotProps) => {
  return (
    <figure className="relative flex flex-col items-end pt-1 pb-2">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
        <Image src={src} alt={alt} fill priority className="object-cover" />
      </div>
      <figcaption className="bg-background-inverted text-foreground-inverted/80 mx-auto w-fit max-w-11/12 -translate-y-3.5 rounded-lg px-3 py-1.5 text-center text-sm shadow md:max-w-3/4 lg:max-w-1/2">
        {alt}
      </figcaption>
    </figure>
  );
};
