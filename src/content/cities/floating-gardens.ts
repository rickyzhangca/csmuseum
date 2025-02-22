import { City } from '@/types';

export const floatingGardens: City = {
  id: 'floating-gardens',
  slug: 'floating-gardens',
  name: 'Aqua Botanica',
  headline: 'The Floating City of Tomorrow',
  description:
    'Aqua Botanica reimagines urban living with its revolutionary floating architecture and integrated hydroponics systems. This experimental city combines sustainable water management with urban agriculture, featuring neighborhoods built atop advanced floating platforms. Residents navigate between floating gardens and markets via solar-powered water taxis. The city showcases how future communities might adapt to rising sea levels while maintaining food security.',
  region: 'oceania',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL7GqOGn819g7-example-playlist-aqua',
  youtubePlaylistThumbnail: '/ui/header-section/europe.webp',
  screenshots: [
    {
      url: '/ui/header-section/europe.webp',
      alt: 'Aqua Botanica floating districts',
      season: 'summer',
      tags: ['floating', 'sustainable', 'experimental', 'agriculture'],
    },
  ],
  draft: true,
  dateAdded: '2024-03-20',
};
