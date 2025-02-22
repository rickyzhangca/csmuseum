import { City } from '@/types';

export const desertOasis: City = {
  id: 'desert-oasis',
  slug: 'desert-oasis',
  name: 'Sahara Springs',
  headline: 'Where Desert Meets Innovation',
  description:
    "Welcome to Sahara Springs, an ambitious project that challenges the conventional limits of desert urban development. This city is being carefully crafted to demonstrate how modern technology and sustainable practices can create a thriving metropolis in one of Earth's most challenging environments. Our vision includes vast solar farms, innovative water management systems, and architecture that both respects and defies the desert environment.",
  region: 'africa',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-desert',
  youtubePlaylistThumbnail: '/ui/header-section/europe.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Sahara Springs aerial view',
      season: 'summer',
      features: ['desert', 'sustainable', 'oasis', 'modern'],
    },
  ],
  dateAdded: '2024-02-19',
};
