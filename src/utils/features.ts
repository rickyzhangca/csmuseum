import { City, Feature, Screenshot } from '@/types';
import { getAllCities } from '@/utils';

export type FeatureWithCount = {
  id: Feature;
  name: string;
  count: number;
};

const cityHasFeatures = (city: City, features: Feature[]): boolean => {
  return city.screenshots.some(
    screenshot =>
      screenshot?.features &&
      features.every(feature => screenshot.features?.includes(feature))
  );
};

export const getUniqueFeatures = (
  selectedFeatures: Feature[] = []
): FeatureWithCount[] => {
  const cities = getAllCities();
  const featureCounts = new Map<Feature, number>();

  // Filter cities that match current selection
  const filteredCities =
    selectedFeatures.length > 0
      ? cities.filter(city => cityHasFeatures(city, selectedFeatures))
      : cities;

  // Count occurrences of each feature in filtered cities
  filteredCities.forEach((city: City) => {
    city.screenshots.forEach((screenshot: Screenshot | undefined) => {
      if (screenshot?.features) {
        screenshot.features.forEach(feature => {
          // Only count features that aren't already selected
          if (!selectedFeatures.includes(feature)) {
            featureCounts.set(feature, (featureCounts.get(feature) || 0) + 1);
          }
        });
      }
    });
  });

  // Add selected features with full city count
  selectedFeatures.forEach(feature => {
    const count = cities.filter(city =>
      cityHasFeatures(city, [feature])
    ).length;
    featureCounts.set(feature, count);
  });

  // Convert to array and sort by selection status, then count (descending), then name
  return Array.from(featureCounts.entries())
    .sort(([a, aCount], [b, bCount]) => {
      const aSelected = selectedFeatures.includes(a);
      const bSelected = selectedFeatures.includes(b);
      if (aSelected !== bSelected) return aSelected ? -1 : 1;
      if (aCount !== bCount) return bCount - aCount;
      return a.localeCompare(b);
    })
    .map(([feature, count]) => ({
      id: feature,
      name: feature.charAt(0).toUpperCase() + feature.slice(1).toLowerCase(),
      count,
    }));
};
