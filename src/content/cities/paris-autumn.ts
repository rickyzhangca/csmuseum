import { City } from '@/types';

export const parisAutumn: City = {
  id: 'paris-autumn',
  slug: 'paris-autumn',
  name: 'Autumn in Paris',
  headline: 'A City of Light and Color',
  description:
    'Experience the charm of Auberge, a city inspired by the timeless elegance of Paris in the golden hues of autumn. Wide boulevards lined with chestnut trees, intricate canal systems reflecting historic architecture, and charming plazas filled with life define this European gem. Auberge prioritizes pedestrian flow and public transport, encouraging citizens to explore its rich cultural tapestry on foot or via its extensive tram network. Prepare to be transported to a world of classic European urban design.',
  region: 'europe',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-paris',
  youtubePlaylistThumbnail: '/ui/header-section/europe.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Autumn in Paris cityscape',
      season: 'fall',
      tags: ['european', 'historic', 'dense', 'autumn-colors'],
    },
  ],
  contest: {
    name: 'European Aesthetics',
    placement: 'winner',
    year: 2024,
  },
  dateAdded: '2024-02-19',
};
