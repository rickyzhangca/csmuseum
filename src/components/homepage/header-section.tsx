import { tw, withBunny } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from '../link-button';

const regions = [
  {
    href: '/cities/north-american',
    src: '/ui/header-section/europe.webp',
    title: 'North American',
  },
  {
    href: '/cities/european',
    src: '/ui/header-section/europe.webp',
    title: 'European',
  },
  {
    href: '/cities/asian',
    src: '/ui/header-section/europe.webp',
    title: 'Asian',
  },
] as const;

const features = [
  {
    href: '/cities/interchanges',
    src: '/ui/header-section/europe.webp',
    title: 'Interchanges',
  },
  {
    href: '/cities/downtown',
    src: '/ui/header-section/europe.webp',
    title: 'Downtown',
  },
  {
    href: '/cities/suburb',
    src: '/ui/header-section/europe.webp',
    title: 'Suburb',
  },
  {
    href: '/cities/transit-hub',
    src: '/ui/header-section/europe.webp',
    title: 'Transit hub',
  },
] as const;

const Card = ({
  href,
  src,
  title,
  className,
}: {
  href: string;
  src: string;
  title: string;
  className?: string;
}) => (
  <Link
    href={href}
    className={tw(
      'group/card relative flex items-center justify-center overflow-hidden rounded-2xl bg-gray-950 transition-all duration-300 group-hover/grid:opacity-70 hover:z-10 hover:scale-105 hover:opacity-100 hover:shadow-2xl',
      className
    )}
  >
    <Image
      src={withBunny(src)}
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
          {regions.map(({ href, src, title }) => (
            <Card key={href} href={href} src={src} title={title} />
          ))}
        </div>
        {features.map(({ href, src, title }) => (
          <Card key={href} href={href} src={src} title={title} />
        ))}
      </div>

      <div className="group/grid hidden w-full flex-col gap-4 sm:flex lg:hidden">
        <div className="flex flex-col gap-4 sm:flex-row">
          {regions.map(({ href, src, title }) => (
            <Card key={href} href={href} src={src} title={title} />
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          {features.map(({ href, src, title }) => (
            <Card key={href} href={href} src={src} title={title} />
          ))}
        </div>
      </div>

      <div className="group/grid hidden h-[520px] w-full grid-flow-col grid-cols-5 grid-rows-2 gap-4 lg:grid">
        <Card
          href={regions[0].href}
          src={regions[0].src}
          title={regions[0].title}
          className="row-span-2"
        />
        <Card
          href={features[0].href}
          src={features[0].src}
          title={features[0].title}
        />
        <Card
          href={features[1].href}
          src={features[1].src}
          title={features[1].title}
        />
        <Card
          href={regions[1].href}
          src={regions[1].src}
          title={regions[1].title}
          className="row-span-2"
        />
        <Card
          href={features[2].href}
          src={features[2].src}
          title={features[2].title}
        />
        <Card
          href={features[3].href}
          src={features[3].src}
          title={features[3].title}
        />
        <Card
          href={regions[2].href}
          src={regions[2].src}
          title={regions[2].title}
          className="row-span-2"
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <LinkButton href="/cities">Browse all cities</LinkButton>
        <LinkButton href="/cities">I&apos;m feeling lucky</LinkButton>
      </div>
    </header>
  );
};
