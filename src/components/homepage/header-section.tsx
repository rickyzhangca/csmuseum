import { Feature, Region } from '@/types';
import { tw, withBunnyHeaderSection } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from '../link-button';
import { LuckyButton } from '../lucky-button';

const regions: Array<{
  region: Region;
  src: string;
  title: string;
}> = [
  {
    region: 'american',
    src: withBunnyHeaderSection('american'),
    title: 'American',
  },
  {
    region: 'european',
    src: withBunnyHeaderSection('european'),
    title: 'European',
  },
  {
    region: 'asian',
    src: withBunnyHeaderSection('asian'),
    title: 'Asian',
  },
] as const;

const features: Array<{
  feature: Feature;
  src: string;
  title: string;
}> = [
  {
    feature: 'intersections',
    src: withBunnyHeaderSection('intersections'),
    title: 'Intersections',
  },
  {
    feature: 'downtown',
    src: withBunnyHeaderSection('downtown'),
    title: 'Downtown',
  },
  {
    feature: 'transit hub',
    src: withBunnyHeaderSection('transit-hub'),
    title: 'Transit Hub',
  },
  {
    feature: 'suburb',
    src: withBunnyHeaderSection('suburb'),
    title: 'Suburb',
  },
] as const;

const Card = ({
  feature,
  region,
  src,
  title,
  className,
}: {
  feature?: Feature;
  region?: Region;
  src: string;
  title: string;
  className?: string;
}) => (
  <Link
    href={{
      pathname: '/cities',
      query: feature
        ? { tab: 'features', features: feature }
        : { tab: 'features', regions: region },
    }}
    className={tw(
      'group/card relative flex items-center justify-center overflow-hidden rounded-2xl bg-gray-950 transition-all duration-300 group-hover/grid:opacity-70 hover:z-10 hover:scale-105 hover:opacity-100 hover:shadow-2xl',
      className
    )}
  >
    <Image
      src={src}
      alt={title}
      width={1280}
      height={720}
      className="h-32 w-full object-cover opacity-40 sm:h-full"
    />
    <p className="group-hover/card:bg-background group-hover/card:text-foreground text-foreground-inverted absolute z-10 flex items-center justify-center rounded-full px-4 py-2 text-center text-xl font-semibold transition">
      {title}
    </p>
  </Link>
);

export const HeaderSection = () => {
  return (
    <header className="flex flex-col items-center gap-16 pt-16 pb-4 text-center">
      <div className="flex flex-col gap-4">
        <h1>How do you city?</h1>
        <p className="text-xl text-gray-500">
          Discover the best cities from world-wide creators
        </p>
      </div>

      <div className="group/grid grid w-full grid-cols-2 gap-4 sm:hidden">
        <div className="col-span-2 flex flex-col gap-4">
          {regions.map(({ region, src, title }) => (
            <Card key={region} region={region} src={src} title={title} />
          ))}
        </div>
        {features.map(({ feature, src, title }) => (
          <Card key={feature} feature={feature} src={src} title={title} />
        ))}
      </div>

      <div className="group/grid hidden w-full flex-col gap-4 sm:flex lg:hidden">
        <div className="flex flex-col gap-4 sm:flex-row">
          {regions.map(({ region, src, title }) => (
            <Card key={region} region={region} src={src} title={title} />
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          {features.map(({ feature, src, title }) => (
            <Card key={feature} feature={feature} src={src} title={title} />
          ))}
        </div>
      </div>

      <div className="group/grid hidden h-[520px] w-full grid-flow-col grid-cols-5 grid-rows-2 gap-4 lg:grid">
        <Card
          region={regions[0].region}
          src={regions[0].src}
          title={regions[0].title}
          className="row-span-2"
        />
        <Card
          feature={features[0].feature}
          src={features[0].src}
          title={features[0].title}
        />
        <Card
          feature={features[1].feature}
          src={features[1].src}
          title={features[1].title}
        />
        <Card
          region={regions[1].region}
          src={regions[1].src}
          title={regions[1].title}
          className="row-span-2"
        />
        <Card
          feature={features[2].feature}
          src={features[2].src}
          title={features[2].title}
        />
        <Card
          feature={features[3].feature}
          src={features[3].src}
          title={features[3].title}
        />
        <Card
          region={regions[2].region}
          src={regions[2].src}
          title={regions[2].title}
          className="row-span-2"
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <LinkButton href="/cities" target="_self">
          Browse all cities
        </LinkButton>
        <LuckyButton />
      </div>
    </header>
  );
};
