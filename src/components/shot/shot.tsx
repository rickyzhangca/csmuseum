import Image from 'next/image';
import { ShotMask } from './shot-mask';

type ShotProps = {
  src: string;
  alt?: string;
};

export const Shot = ({ src, alt }: ShotProps) => {
  return (
    <figure className="group relative flex flex-col items-center">
      <div className="relative aspect-[2/1] w-full max-w-[1920px] overflow-hidden">
        <Image
          src={src}
          alt={alt || 'Game screenshot'}
          fill
          priority
          className="object-cover"
        />
        <ShotMask />
      </div>
      {alt && (
        <figcaption className="text-foreground-inverted/80 absolute bottom-2 left-1/2 w-fit max-w-11/12 -translate-x-1/2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 px-3 py-1.5 text-center text-sm opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100 md:max-w-3/4 lg:max-w-1/2">
          {alt}
        </figcaption>
      )}
    </figure>
  );
};
