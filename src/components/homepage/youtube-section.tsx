import { cities } from '@/content/cities';
import { YoutubeIcon } from 'lucide-react';
import { Section } from '../section';
import { YouTubeSectionCards } from './youtube-section-cards';

export async function YouTubeSection() {
  const citiesWithYoutube = cities
    .filter(city => city.youtubePlaylistUrl)
    .slice(0, 5);

  return (
    <Section>
      <Section.Header>
        <Section.Chip className="bg-red-100 text-red-600">
          <YoutubeIcon
            className="size-4 min-w-4"
            strokeWidth={2}
            absoluteStrokeWidth
          />
          YouTube Playlists
        </Section.Chip>
        <Section.Title>City Biographies</Section.Title>
        <Section.Description>
          Watch cities rise from empty maps to sprawling legends, one episode at
          a time.
        </Section.Description>
      </Section.Header>
      <Section.Content className="flex flex-col items-center">
        <YouTubeSectionCards cities={citiesWithYoutube} />
      </Section.Content>
    </Section>
  );
}
