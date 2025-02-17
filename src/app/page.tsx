import { CityMeta } from '@/types/city';
import { tw, withBunny } from '@/utils';
import { getAllCitiesMeta, getFeaturedCities } from '@/utils/cities';
import Image from 'next/image';
import Link from 'next/link';

function CityCard({ city }: { city: CityMeta }) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group relative overflow-hidden rounded-xl bg-gray-100 transition-all hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
    >
      {city.frontmatter.screenshots[0] && (
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={city.frontmatter.screenshots[0]}
            alt={city.frontmatter.title}
            width={600}
            height={338}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{city.frontmatter.title}</h3>
        <div className="mb-2 flex flex-wrap gap-2">
          {city.frontmatter.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{city.frontmatter.region}</span>
          <span>{city.frontmatter.season}</span>
        </div>
      </div>
    </Link>
  );
}

function CitiesGrid({ cities, title }: { cities: CityMeta[]; title: string }) {
  if (cities.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map(city => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </section>
  );
}

const HeaderSection = () => {
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
      <p className="group-hover/card:bg-foreground-inverted group-hover/card:text-background-inverted text-foreground-inverted absolute z-10 flex items-center justify-center rounded-full px-4 py-2 text-center text-xl font-semibold transition">
        {title}
      </p>
    </Link>
  );

  return (
    <header className="flex flex-col items-center gap-24 py-24">
      <h1 className="text-center">How do you city?</h1>
      <div className="group/grid grid grid-cols-2 gap-4 sm:hidden">
        <div className="col-span-2 flex flex-col gap-4">
          <Card
            href="/cities/european"
            src="/ui/header-section/europe.webp"
            title="North American"
          />
          <Card
            href="/cities/european"
            src="/ui/header-section/europe.webp"
            title="European"
          />
          <Card
            href="/cities/asian"
            src="/ui/header-section/europe.webp"
            title="Asian"
          />
        </div>
        <Card
          href="/cities/interchanges"
          src="/ui/header-section/europe.webp"
          title="Interchanges"
        />
        <Card
          href="/cities/downtown"
          src="/ui/header-section/europe.webp"
          title="Downtown"
        />
        <Card
          href="/cities/suburb"
          src="/ui/header-section/europe.webp"
          title="Suburb"
        />
        <Card
          href="/cities/transit-hub"
          src="/ui/header-section/europe.webp"
          title="Transit hub"
        />
      </div>
      <div className="group/grid hidden w-full flex-col gap-4 sm:flex lg:hidden">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Card
            href="/cities/european"
            src="/ui/header-section/europe.webp"
            title="North American"
          />
          <Card
            href="/cities/european"
            src="/ui/header-section/europe.webp"
            title="European"
          />
          <Card
            href="/cities/asian"
            src="/ui/header-section/europe.webp"
            title="Asian"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Card
            href="/cities/interchanges"
            src="/ui/header-section/europe.webp"
            title="Interchanges"
          />
          <Card
            href="/cities/downtown"
            src="/ui/header-section/europe.webp"
            title="Downtown"
          />
          <Card
            href="/cities/suburb"
            src="/ui/header-section/europe.webp"
            title="Suburb"
          />
          <Card
            href="/cities/transit-hub"
            src="/ui/header-section/europe.webp"
            title="Transit hub"
          />
        </div>
      </div>
      <div className="group/grid hidden h-96 w-full grid-flow-col grid-cols-5 grid-rows-2 gap-4 lg:grid">
        <Card
          href="/cities/european"
          src="/ui/header-section/europe.webp"
          title="North American"
          className="row-span-2"
        />
        <Card
          href="/cities/interchanges"
          src="/ui/header-section/europe.webp"
          title="Interchanges"
        />
        <Card
          href="/cities/downtown"
          src="/ui/header-section/europe.webp"
          title="Downtown"
        />
        <Card
          href="/cities/european"
          src="/ui/header-section/europe.webp"
          title="European"
          className="row-span-2"
        />
        <Card
          href="/cities/suburb"
          src="/ui/header-section/europe.webp"
          title="Suburb"
        />
        <Card
          href="/cities/transit-hub"
          src="/ui/header-section/europe.webp"
          title="Transit hub"
        />
        <Card
          href="/cities/asian"
          src="/ui/header-section/europe.webp"
          title="Asian"
          className="row-span-2"
        />
      </div>
    </header>
  );
};

const Homepage = async () => {
  const featured = await getFeaturedCities();
  const allCities = await getAllCitiesMeta();

  // Group cities by region
  const regions = [...new Set(allCities.map(city => city.frontmatter.region))];
  const citiesByRegion = regions.reduce<Record<string, CityMeta[]>>(
    (acc, region) => {
      acc[region] = allCities.filter(
        city => city.frontmatter.region === region && !city.frontmatter.featured
      );
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-8xl mx-auto p-6">
      <HeaderSection />

      {/* {featured.length > 0 && (
        <CitiesGrid cities={featured} title="Featured Cities" />
      )}

      {regions.map(region => (
        <CitiesGrid
          key={region}
          cities={citiesByRegion[region]}
          title={`${region} Cities`}
        />
      ))} */}
    </div>
  );
};

export default Homepage;
