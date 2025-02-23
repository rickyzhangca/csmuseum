import { Feature, Region } from './feature';

export type Contest = {
  name: string;
  placement: 'winner' | '2nd place' | '3rd place';
  year: number;
};

export type Screenshot = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  features: Feature[];
};

export type City = {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  region: Region;
  youtubePlaylistUrl?: string;
  youtubePlaylistThumbnail?: string;
  screenshots: Screenshot[];
  contest?: Contest;
  dateAdded: string;
  draft?: boolean;
};
