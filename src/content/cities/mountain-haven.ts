import { City } from '@/types';

export const mountainHaven: City = {
  id: 'mountain-haven',
  slug: 'mountain-haven',
  name: 'Alpine Echo',
  headline: 'Living Among the Peaks',
  description:
    'Carved into the mountainside, Alpine Echo demonstrates innovative vertical city planning in extreme terrain. This city utilizes advanced cable car networks and funicular railways to connect terraced neighborhoods that seem to defy gravity. The architecture seamlessly integrates with the mountain landscape, using local materials and traditional alpine design elements while incorporating modern sustainable technologies.',
  region: 'europe',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-alpine',
  youtubePlaylistThumbnail: '/ui/header-section/europe.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Alpine Echo mountain city panorama',
      season: 'winter',
      tags: ['mountain', 'vertical', 'traditional', 'transport'],
    },
  ],
  draft: true,
  dateAdded: '2024-03-20',
};
