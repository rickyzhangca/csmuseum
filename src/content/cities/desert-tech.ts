import { City } from '@/types';

export const desertTech: City = {
  id: 'desert-tech',
  slug: 'desert-tech',
  name: 'Silicon Sands',
  headline: 'Where Tech Meets Tradition',
  description:
    "Silicon Sands represents the perfect fusion of Middle Eastern architectural heritage with cutting-edge technology. Underground cooling systems and smart shade structures make this desert metropolis comfortable year-round. The city features a unique mix of traditional souks and high-tech research facilities, all powered by one of the world's largest solar farms. Autonomous vehicles glide silently through streets lined with a modern interpretation of traditional mashrabiya patterns.",
  region: 'asia',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-silicon',
  youtubePlaylistThumbnail: '/ui/header-section/europe.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Silicon Sands cityscape',
      season: 'summer',
      tags: ['tech', 'desert', 'traditional', 'smart-city'],
    },
  ],
  draft: true,
  dateAdded: '2024-03-20',
};
