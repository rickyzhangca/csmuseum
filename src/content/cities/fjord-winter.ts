import { City } from '@/types';

export const fjordWinter: City = {
  id: 'fjord-winter',
  slug: 'fjord-winter',
  name: 'Nordic Fjord',
  headline: 'Where Mountains Meet the Sea',
  description:
    'Brave the crisp air of Frostfjord, a city nestled amidst breathtaking Nordic fjords, blanketed in winter snow. Minimalist Scandinavian design blends seamlessly with the dramatic natural landscape, creating a serene and beautiful urban environment. Frostfjord prioritizes sustainability and harmony with nature. Efficient public transport and thoughtful urban planning ensure a high quality of life, even in the depths of winter. Discover the beauty of minimalist urbanism in a stunning natural setting.',
  region: 'europe',
  tags: ['nordic', 'coastal', 'winter', 'natural'],
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-fjord',
  youtubePlaylistThumbnail: '/ui/header-section/europe.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Frostfjord winter panorama',
      season: 'winter',
    },
  ],
  contest: {
    name: 'Natural Integration',
    placement: 'winner',
    year: 2024,
  },
  dateAdded: '2024-02-19',
};
