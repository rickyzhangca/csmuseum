import { City } from '@/types';

export const newYorkSprawl: City = {
  id: 'new-york-sprawl',
  slug: 'new-york-sprawl',
  name: 'New Manhattan',
  headline: 'Grid Perfection',
  description:
    'Dive into the sprawling landscape of Liberty Heights, a city embodying the quintessential North American suburban dream. Vast grids of single-family homes, punctuated by strip malls and punctuated by wide highways, define this car-centric metropolis. Liberty Heights showcases the challenges and triumphs of managing suburban sprawl. Mastering traffic flow across its extensive highway network is key to keeping this city thriving. Explore the iconic American urban form, for better or worse.',
  region: 'americas',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-newyork',
  youtubePlaylistThumbnail: '/ui/header-section/europe.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'New Manhattan grid system aerial view',
      season: 'summer',
      tags: ['urban', 'grid', 'skyscrapers', 'dense', 'american'],
    },
  ],
  dateAdded: '2024-02-19',
};
