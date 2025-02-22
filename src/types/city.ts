export const Regions = [
  'asia',
  'europe',
  'americas',
  'africa',
  'oceania',
] as const;
export type Region = (typeof Regions)[number];

export const Seasons = ['spring', 'summer', 'fall', 'winter'] as const;
export type Season = (typeof Seasons)[number];

export type Contest = {
  name: string;
  placement: 'winner' | '2nd place' | '3rd place';
  year: number;
};

export type Screenshot = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  season?: Season;
};

export type City = {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  region: Region;
  seasons?: Season[];
  tags: string[];
  youtubePlaylistUrl?: string;
  youtubePlaylistThumbnail?: string;
  screenshots: Screenshot[];
  contest?: Contest;
  dateAdded: string;
  draft?: boolean;
};
