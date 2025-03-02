import { Regions } from '@/content';
import { Feature } from './feature';
import { Season } from './season';

export type Region = (typeof Regions)[number];

export type Contest = {
  name: string;
  placement: 'winner' | '2nd place' | '3rd place';
  year: number;
};

export type City = {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  region: Region;
  creator: string;
  gameVersion: 1 | 2;
  youtubePlaylistUrl?: string;
  features: Feature[];
  screenshotCount: number;
  season?: Season;
  contest?: Contest;
  dateAdded: string;
  draft?: boolean;
};
