'use client';

import { CityMeta } from '@/types/city';
import { tw, withBunny } from '@/utils';
import { YoutubeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

const CARD_WIDTH = 500;

const interpolate = (
  value: number,
  [fromMin, fromMax]: [number, number],
  [toMin, toMax]: [number, number]
): number => {
  const fromRange = fromMax - fromMin;
  const toRange = toMax - toMin;
  const scaledValue = (value - fromMin) / fromRange;
  return toMin + scaledValue * toRange;
};

type YouTubeSectionCardProps = {
  city: CityMeta;
  offset: number;
  scale: number;
  origin: number;
  zIndex: number;
  opacity: number;
  isHovered: boolean;
  onMouseEnter: () => void;
};

const YouTubeSectionCard = ({
  city,
  zIndex,
  offset,
  scale,
  origin,
  opacity,
  isHovered,
  onMouseEnter,
}: YouTubeSectionCardProps) => {
  return (
    <div
      className={tw('group absolute w-[500px] shrink-0 transition')}
      style={{
        zIndex: zIndex,
        transform: `translateX(${offset}px)`,
      }}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={tw(
          'bg-foreground overflow-hidden rounded-2xl transition duration-300 ease-in-out',
          isHovered && 'shadow-2xl'
        )}
        style={{
          width: CARD_WIDTH,
          transformOrigin: `${origin}% 50%`,
          scale,
        }}
      >
        <div className="relative -z-10 aspect-[1.91/1] w-full">
          <Image
            src={withBunny(city.frontmatter.youtube_playlist_thumbnail)}
            alt={city.frontmatter.name}
            fill
            className="object-cover transition duration-400 ease-in-out"
            style={{
              scale: isHovered ? 1.08 : 1,
              opacity,
            }}
          />
          <Link
            href={city.frontmatter.youtube_playlist_url}
            target="_blank"
            rel="noopener noreferrer"
            className={tw(
              'absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 shadow-lg transition duration-300 ease-in-out hover:bg-red-700 hover:shadow-2xl',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            <YoutubeIcon
              className="size-6 text-white"
              strokeWidth={1.5}
              absoluteStrokeWidth
            />
            <p className="text-sm text-white">Watch the series</p>
          </Link>
        </div>
        <div className="bg-foreground flex flex-col items-center p-4">
          <h4 className="text-foreground-inverted">{city.frontmatter.name}</h4>
          <p className="text-foreground-inverted/50 text-sm">
            {city.frontmatter.headline}
          </p>
        </div>
      </div>
    </div>
  );
};

const getZIndex = (
  index: number,
  hoveredIndex: number,
  totalCities: number
) => {
  if (hoveredIndex === index) return totalCities - 1;
  return totalCities - 1 - Math.abs(hoveredIndex - index);
};

const getScale = (zIndex: number, totalCities: number) => {
  if (zIndex === totalCities - 1) return 1;
  return 1 - 0.07 * (totalCities - 1 - zIndex);
};

const getOpacity = (zIndex: number, totalCities: number) => {
  if (zIndex === totalCities - 1) return 1;
  return 1 - 0.2 * (totalCities - 1 - zIndex);
};

type YouTubeSectionCardsProps = {
  cities: CityMeta[];
};

export const YouTubeSectionCards = ({ cities }: YouTubeSectionCardsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({
    ref,
    box: 'border-box',
  });

  return (
    <div ref={ref} className="relative flex h-90 items-center">
      {cities.map((city, i) => {
        const zIndex = getZIndex(i, hoveredIndex, cities.length);
        const scale = getScale(zIndex, cities.length);
        const opacity = getOpacity(zIndex, cities.length);
        return (
          <YouTubeSectionCard
            key={city.slug}
            city={city}
            zIndex={zIndex}
            offset={
              (CARD_WIDTH -
                Math.abs(width - CARD_WIDTH * cities.length) /
                  (cities.length - 1)) *
              i
            }
            origin={interpolate(i, [0, cities.length - 1], [0, 100])}
            scale={scale}
            opacity={opacity}
            isHovered={hoveredIndex === i}
            onMouseEnter={() => setHoveredIndex(i)}
          />
        );
      })}
    </div>
  );
};
