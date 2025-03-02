import { FeatureWithCount } from '@/components/feature-select/feature-select';
import { FeatureCategories } from '@/content';
import { City, Feature, FeatureCategory } from '@/types';
import { getAllCities } from '@/utils';

const cityHasFeatures = (city: City, features: Feature[]): boolean => {
  return city.features.some(feature => features.includes(feature));
};

export const getUniqueFeatures = (
  selectedFeatures: Feature[] = []
): FeatureWithCount[] => {
  const cities = getAllCities();
  const featureCounts = new Map<Feature, number>();

  const filteredCities =
    selectedFeatures.length > 0
      ? cities.filter(city => cityHasFeatures(city, selectedFeatures))
      : cities;

  filteredCities.forEach((city: City) => {
    city.features.forEach((feature: Feature) => {
      if (feature) {
        // Only count features that aren't already selected
        if (!selectedFeatures.includes(feature)) {
          featureCounts.set(feature, (featureCounts.get(feature) || 0) + 1);
        }
      }
    });
  });

  selectedFeatures.forEach(feature => {
    const count = cities.filter(city =>
      cityHasFeatures(city, [feature])
    ).length;
    featureCounts.set(feature, count);
  });

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
      category: getFeatureCategory(feature),
    }));
};

export const getFeatureCategory = (feature: Feature): FeatureCategory => {
  for (const [category, features] of Object.entries(FeatureCategories)) {
    if ((features as readonly string[]).includes(feature)) {
      return category as FeatureCategory;
    }
  }
  return 'special';
};
