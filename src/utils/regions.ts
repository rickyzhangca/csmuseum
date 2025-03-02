import { City, Region } from '@/types';
import { getAllCities } from '@/utils';

export type RegionWithCount = {
  id: Region;
  name: string;
  count: number;
};

export const getUniqueRegions = (
  selectedRegions: Region[] = []
): RegionWithCount[] => {
  const cities = getAllCities();
  const regionCounts = new Map<Region, number>();

  const filteredCities =
    selectedRegions.length > 0
      ? cities.filter(city => selectedRegions.includes(city.region))
      : cities;

  filteredCities.forEach((city: City) => {
    const region = city.region;
    if (region && !selectedRegions.includes(region)) {
      regionCounts.set(region, (regionCounts.get(region) || 0) + 1);
    }
  });

  selectedRegions.forEach(region => {
    const count = cities.filter(city => city.region === region).length;
    regionCounts.set(region, count);
  });

  return Array.from(regionCounts.entries())
    .sort(([a, aCount], [b, bCount]) => {
      const aSelected = selectedRegions.includes(a);
      const bSelected = selectedRegions.includes(b);
      if (aSelected !== bSelected) return aSelected ? -1 : 1;
      if (aCount !== bCount) return bCount - aCount;
      return a.localeCompare(b);
    })
    .map(([region, count]) => ({
      id: region,
      name: region.charAt(0).toUpperCase() + region.slice(1).toLowerCase(),
      count,
    }));
};
