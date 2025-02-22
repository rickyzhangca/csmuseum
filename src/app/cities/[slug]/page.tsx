import { getCityBySlug } from '@/content/cities';
import { withBunny } from '@/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.slug);

  if (!city) {
    return {
      title: 'City Not Found - CSMuseum',
      description: 'The requested city could not be found.',
    };
  }

  return {
    title: `${city.name} - CSMuseum`,
    description: city.description,
  };
}

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.slug);

  if (!city) {
    notFound();
  }

  return (
    <div className="container flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/cities"
          className="text-muted-foreground hover:text-foreground w-fit text-sm transition"
        >
          ← Back to Cities
        </Link>
        <h1 className="text-4xl font-bold">{city.name}</h1>
        <p className="text-muted-foreground text-xl">{city.headline}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {city.screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="relative aspect-video overflow-hidden rounded-lg"
          >
            <Image
              src={withBunny(screenshot.url)}
              alt={screenshot.alt || `${city.name} screenshot ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="text-muted-foreground">{city.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h3 className="font-medium">Region</h3>
            <p className="text-muted-foreground">{city.region}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h3 className="font-medium">Season</h3>
            <p className="text-muted-foreground">{city.seasons.join(', ')}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h3 className="font-medium">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {city.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {city.contest && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Contest</h2>
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h3 className="font-medium">{city.contest.name}</h3>
            <p className="text-muted-foreground">
              {city.contest.placement} ({city.contest.year})
            </p>
          </div>
        </div>
      )}

      {city.youtubePlaylistUrl && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">YouTube Playlist</h2>
          <Link
            href={city.youtubePlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video overflow-hidden rounded-lg"
          >
            <Image
              src={withBunny(
                city.youtubePlaylistThumbnail || city.screenshots[0].url
              )}
              alt={`${city.name} YouTube playlist`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-lg font-medium text-white">
                Watch on YouTube
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
