'use client';

import { City } from '@/types/city';
import { tw, withBunny } from '@/utils';
import { YoutubeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HorizontalScrollable } from '../horizontal-scrollable';

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
  city: City;
  offset?: number;
  scale?: number;
  origin?: number;
  zIndex?: number;
  opacity?: number;
  isHovered?: boolean;
  onMouseEnter?: () => void;
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
      className={tw(
        'group w-[500px] shrink-0 transition',
        !!offset && 'absolute'
      )}
      style={{
        zIndex: zIndex ?? 0,
        transform: offset ? `translateX(${offset}px)` : undefined,
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
          transformOrigin: origin ? `${origin}% 50%` : undefined,
          scale: scale ?? 1,
        }}
      >
        <div className="relative -z-10 aspect-[1.91/1] w-full">
          <Image
            src={withBunny(
              city.youtubePlaylistThumbnail || city.screenshots[0].url
            )}
            alt={`${city.name} YouTube playlist`}
            fill
            className="object-cover transition duration-400 ease-in-out"
            style={{
              scale: isHovered ? 1.08 : 1,
              opacity: opacity ?? 1,
            }}
          />
          <Link
            href={city.youtubePlaylistUrl || ''}
            target="_blank"
            rel="noopener noreferrer"
            className={tw(
              'absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 shadow-lg transition duration-300 ease-in-out hover:bg-red-700 hover:shadow-2xl',
              !!isHovered && isHovered ? 'opacity-100' : 'opacity-0'
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
        <div className="to-background-inverted flex flex-col items-center bg-radial-[at_50%_0%] from-red-950 p-4">
          <h4 className="text-foreground-inverted">{city.name}</h4>
          <p className="text-foreground-inverted/50 text-sm">{city.headline}</p>
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
  cities: City[];
};

export const YouTubeSectionCards = ({ cities }: YouTubeSectionCardsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative hidden h-90 w-full items-center lg:flex"
      >
        {cities.map((city, i) => {
          const zIndex = getZIndex(i, hoveredIndex, cities.length);
          const scale = getScale(zIndex, cities.length);
          const opacity = getOpacity(zIndex, cities.length);
          return (
            <YouTubeSectionCard
              key={city.id}
              city={city}
              zIndex={zIndex}
              offset={
                (CARD_WIDTH -
                  Math.abs(containerWidth - CARD_WIDTH * cities.length) /
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
      <HorizontalScrollable className="w-full lg:hidden">
        <div className="flex gap-2">
          {cities.map(city => {
            return <YouTubeSectionCard key={city.id} city={city} />;
          })}
        </div>
      </HorizontalScrollable>
    </>
  );
};
