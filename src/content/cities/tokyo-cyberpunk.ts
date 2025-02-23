import { City, Feature } from '@/types';

const features: Feature[] = [
  'asia',
  'modern',
  'futuristic',
  'dense',
  'neon',
  'smart-city',
  'night',
];

export const tokyoCyberpunk: City = {
  id: 'tokyo-cyberpunk',
  slug: 'tokyo-cyberpunk',
  name: 'Neo Tokyo',
  headline: 'A Glimpse into Tomorrow',
  description:
    'Step into the future with Neo Tokyo, a cyberpunk metropolis that pushes the boundaries of urban innovation. Towering skyscrapers pierce the clouds, their surfaces alive with holographic displays and streaming data. The city pulses with energy, from its bustling street markets to its elevated mag-lev trains. Advanced AI systems manage everything from traffic flow to climate control, while sustainable technology ensures this megacity treads lightly on the environment.',
  region: 'asia',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-tokyo',
  youtubePlaylistThumbnail: '/ui/header-section/asia.webp',
  screenshots: [
    {
      url: '/ui/header-section/asia.webp',
      alt: 'Neo Tokyo night cityscape',
      features,
    },
  ],
  contest: {
    name: 'Future Cities',
    placement: 'winner',
    year: 2024,
  },
  dateAdded: '2024-02-19',
};
