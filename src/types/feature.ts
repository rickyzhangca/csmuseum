import { Regions, Seasons } from '@/content';

import { OtherFeatures } from '@/content';

export type Region = (typeof Regions)[number];

export type Season = (typeof Seasons)[number];

export type Feature = (typeof OtherFeatures)[number] | Region | Season;
