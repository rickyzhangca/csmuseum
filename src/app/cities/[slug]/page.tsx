import { getCityBySlug, getCitySlugs } from '@/utils/cities';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { MDXContent } from './mdx-content';

export async function generateStaticParams() {
  const slugs = getCitySlugs();
  return slugs.map((slug: string) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function CityPage({ params }: PageProps) {
  try {
    const resolvedParams = 'then' in params ? await params : params;
    const city = await getCityBySlug(resolvedParams.slug);
    const { frontmatter } = city;

    return (
      <article className="mx-auto max-w-4xl px-4 py-8">
        <header className="mb-8">
          <h1 className="mb-4 text-5xl font-bold">{frontmatter.title}</h1>
          <div className="mb-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Region:</span>{' '}
              {frontmatter.region}
            </div>
            <div>
              <span className="font-semibold">Season:</span>{' '}
              {frontmatter.season}
            </div>
            <div>
              <span className="font-semibold">Population:</span>{' '}
              {frontmatter.stats.population}
            </div>
          </div>
        </header>

        {frontmatter.screenshots.length > 0 && (
          <div className="mb-8">
            <Image
              src={frontmatter.screenshots[0]}
              alt={`Screenshot of ${frontmatter.title}`}
              width={1200}
              height={630}
              className="h-[400px] w-full rounded-lg object-cover"
            />
          </div>
        )}

        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
          }
        >
          <MDXContent content={city.content} />
        </Suspense>

        {frontmatter.youtube && (
          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-semibold">Video Tour</h2>
            <div className="aspect-video">
              <iframe
                src={frontmatter.youtube.replace(
                  'playlist',
                  'embed/videoseries'
                )}
                className="h-full w-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </article>
    );
  } catch (error) {
    notFound();
  }
}
