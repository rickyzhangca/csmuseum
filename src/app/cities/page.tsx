import {
  CityCard,
  CityGallery,
  FeatureSelect,
  LinkButton,
  RegionSelect,
} from '@/components';
import { Feature, Region } from '@/types';
import {
  getAllCities,
  getContestWinners,
  getUniqueFeatures,
  getUniqueRegions,
  tw,
  withBunnyShots,
  withBunnyThumbnail,
} from '@/utils';
import {
  ArrowRightIcon,
  Building2Icon,
  SparkleIcon,
  XIcon,
} from 'lucide-react';
import { Metadata } from 'next';
import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cities - CSMuseum',
  description: 'Explore all the cities in CSMuseum.',
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type TabType = 'cities' | 'features';

const Tabs = ({ activeTab }: { activeTab: TabType }) => {
  const Tab = ({
    id,
    href,
    icon,
    label,
  }: {
    id: string;
    href: LinkProps['href'];
    icon: ReactNode;
    label: string;
  }) => (
    <Link
      href={href}
      className={tw(
        'flex items-center justify-center gap-2 rounded-full border border-transparent px-4 py-1.5',
        activeTab === id
          ? 'text-foreground border-gray-200 bg-gray-100'
          : 'hover:text-foreground text-gray-500'
      )}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <div className="flex items-center justify-center rounded-full border border-gray-200 p-1">
      <Tab
        id="cities"
        href="/cities"
        icon={<Building2Icon className="size-4 min-w-4" />}
        label="By city"
      />
      <Tab
        id="features"
        href={{
          pathname: '/cities',
          query: { tab: 'features' },
        }}
        icon={<SparkleIcon className="size-4 min-w-4" />}
        label="By feature"
      />
    </div>
  );
};

export default async function CitiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const isWinningFilter = params?.filter === 'winning';
  const activeTab = (
    params?.tab === 'features' ? 'features' : 'cities'
  ) as TabType;
  const selectedFeatures = ((params?.features as string)?.split(',') ||
    []) as Feature[];
  const selectedRegions = ((params?.regions as string)?.split(',') ||
    []) as Region[];
  const features = getUniqueFeatures(selectedFeatures);
  const regions = getUniqueRegions(selectedRegions);

  let cities = isWinningFilter ? getContestWinners() : getAllCities();

  if (activeTab === 'features' && selectedFeatures.length > 0) {
    cities = cities.filter(city =>
      city.features.some(feature => selectedFeatures.includes(feature))
    );
  }

  if (selectedRegions.length > 0) {
    cities = cities.filter(city => selectedRegions.includes(city.region));
  }

  return (
    <div className="max-w-8xl mx-auto p-3 lg:p-6">
      <div className="flex flex-col items-center gap-16 py-16 text-center">
        <div className="flex w-full flex-col items-center justify-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <h1>Explore our collection</h1>
            <p className="text-xl text-gray-500">
              CSMuseum is a hand-picked collection of the best cities from
              talented creators worldwide
            </p>
          </div>
          <Tabs activeTab={activeTab} />
        </div>

        {activeTab === 'cities' ? (
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-2 py-4 md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-3">
                <p className="text-gray-500">Show</p>
                <Link
                  href={{
                    pathname: '/cities',
                    query: {
                      filter: isWinningFilter ? undefined : 'winning',
                    },
                  }}
                  className={tw(
                    'flex w-fit items-center justify-center gap-2 rounded-full border px-4 py-1.5 transition',
                    isWinningFilter
                      ? 'border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100'
                      : 'text-foreground bg-background border-gray-200 hover:bg-gray-50'
                  )}
                >
                  {isWinningFilter ? 'Contest-winning' : 'All collected'}
                  {isWinningFilter && <XIcon className="size-4 min-w-4" />}
                </Link>
                <p className="text-gray-500">cities</p>
              </div>
            </div>
            {cities.map(city => (
              <CityCard key={city.slug} href={`/cities/${city.slug}`}>
                <CityCard.Image
                  src={withBunnyThumbnail(city.slug)}
                  alt={city.name}
                  className="h-48 w-full object-cover"
                />
                <CityCard.Title>{city.name}</CityCard.Title>
                <CityCard.Subtitle>{city.headline}</CityCard.Subtitle>
              </CityCard>
            ))}
          </div>
        ) : (
          <div className="w-full">
            <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-3 flex w-full flex-wrap items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-2 py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <p className="text-gray-500">Show</p>
                  <RegionSelect regions={regions} />
                  <p className="text-gray-500">cities highlighting</p>
                  <FeatureSelect features={features} />
                  <p className="text-gray-500">
                    {selectedFeatures.length > 1 ? 'features' : 'feature'}
                  </p>
                </div>
              </div>

              {cities.map(city => {
                return selectedFeatures.length > 0 ? (
                  <CityGallery
                    key={city.slug}
                    href={`/cities/${city.slug}`}
                    className="col-span-3"
                  >
                    {Array.from({ length: city.screenshotCount }).map(
                      (_, i) => (
                        <CityGallery.Image
                          key={i}
                          src={withBunnyShots(city.id, i + 1)}
                          alt={city.name}
                          className="h-48 w-full object-cover"
                        />
                      )
                    )}
                    <CityGallery.Title>{city.name}</CityGallery.Title>
                    <CityGallery.Subtitle>{city.headline}</CityGallery.Subtitle>
                  </CityGallery>
                ) : (
                  <CityCard key={city.slug} href={`/cities/${city.slug}`}>
                    <CityCard.Image
                      src={withBunnyThumbnail(city.slug)}
                      alt={city.name}
                      className="h-48 w-full object-cover"
                    />
                    <CityCard.Title>{city.name}</CityCard.Title>
                    <CityCard.Subtitle>{city.headline}</CityCard.Subtitle>
                  </CityCard>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          <LinkButton href="https://csmuseum.featurebase.app/">
            Add your own city
          </LinkButton>
          <LinkButton
            href="https://csmuseum.featurebase.app/"
            variant="primary"
          >
            Submit a great city
            <LinkButton.Icon>
              <ArrowRightIcon className="size-4 min-w-4" />
            </LinkButton.Icon>
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
