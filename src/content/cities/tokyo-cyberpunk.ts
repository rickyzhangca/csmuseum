import { City } from '@/types';

export const tokyoCyberpunk: City = {
  id: 'tokyo-cyberpunk',
  slug: 'tokyo-cyberpunk',
  name: 'Neo Tokyo',
  headline: 'Neon Dreams',
  description:
    'Step into the dazzling sprawl of Neo-Tokyo, a city that never sleeps, bathed in the perpetual glow of neon and holographic advertisements. This megacity pushes the limits of vertical urbanism, with towering skyscrapers interconnected by a complex web of monorails and maglev lines. Navigating the dense pedestrian walkways and bustling markets is an experience in itself. But be warned, even with the most advanced transit systems, rush hour in Neo-Tokyo is a spectacle of organized chaos.',
  region: 'asia',
  tags: ['cyberpunk', 'futuristic', 'neon', 'dense', 'unique-theme'],
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-tokyo',
  youtubePlaylistThumbnail: '/ui/header-section/europe.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Neo Tokyo cityscape at night',
      season: 'winter',
    },
  ],
  contest: {
    name: 'Cyberpunk Aesthetic',
    placement: 'winner',
    year: 2024,
  },
  dateAdded: '2024-02-19',
};
