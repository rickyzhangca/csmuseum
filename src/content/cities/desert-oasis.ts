import { City, Feature } from '@/types';

const features: Feature[] = [
  'africa',
  'modern',
  'sustainable',
  'desert',
  'oasis',
  'gardens',
  'smart-city',
  'summer',
];

export const desertOasis: City = {
  id: 'desert-oasis',
  slug: 'desert-oasis',
  name: 'Desert Oasis',
  headline: 'Where Innovation Meets Tradition',
  description:
    'Welcome to Al-Wahat, a sustainable oasis city that harmoniously blends cutting-edge technology with desert living. Solar farms power smart buildings designed to minimize energy consumption, while traditional wind towers provide natural cooling. Vertical gardens and water recycling systems create green spaces throughout the city, demonstrating how modern urban development can thrive in even the most challenging environments.',
  region: 'africa',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-oasis',
  youtubePlaylistThumbnail: '/ui/header-section/africa.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Desert Oasis cityscape',
      features,
    },
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Desert Oasis cityscape',
      features,
    },
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Desert Oasis cityscape',
      features,
    },
  ],
  contest: {
    name: 'Sustainable Cities',
    placement: 'winner',
    year: 2024,
  },
  dateAdded: '2024-02-19',
};
