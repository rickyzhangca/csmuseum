import { FeatureCategories } from '@/content';

export type FeatureCategory = keyof typeof FeatureCategories;

export const CategoryDisplayNames: Record<FeatureCategory, string> = {
  transportation: 'Transportation',
  time: 'Time of Day',
  architectural: 'Architectural',
  urban: 'Urban',
  natural: 'Natural',
  special: 'Special',
};

export const Features = Object.values(FeatureCategories).flat();

export type Feature = (typeof Features)[number];
