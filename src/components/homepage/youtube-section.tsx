import { getAllCitiesMeta } from '@/utils/cities';
import { YoutubeIcon } from 'lucide-react';
import { Section } from '../section';
import { YouTubeSectionCards } from './youtube-section-cards';

export const YouTubeSection = async () => {
  const cities = (await getAllCitiesMeta())
    .filter(city => city.frontmatter.youtube_playlist_url)
    .slice(0, 5);

  return (
    <Section>
      <Section.Header>
        <Section.Chip className="bg-red-100 text-red-600">
          <YoutubeIcon className="size-4" strokeWidth={2} absoluteStrokeWidth />
          YouTube Sagas
        </Section.Chip>
        <Section.Title>City Biographies</Section.Title>
        <Section.Description>
          Watch cities rise from empty maps to sprawling legends, one episode at
          a time.
        </Section.Description>
      </Section.Header>
      <Section.Content>
        <YouTubeSectionCards cities={cities} />
      </Section.Content>
    </Section>
  );
};
