import { cities } from '@/content';
import { City, Season } from '@/types';

export const getAllCities = (sortBy: 'dateAdded' | 'name' = 'dateAdded') =>
  [...cities].sort((a, b) => {
    if (sortBy === 'dateAdded') {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    return a.name.localeCompare(b.name);
  });

export const getCityBySlug = async (slug: string) =>
  cities.find(city => city.slug === slug);

export const getCitiesByRegion = (region: City['region']) =>
  cities.filter(city => city.region === region);

export const getCitiesByTag = (tag: string) =>
  cities.filter(city =>
    city.screenshots.some(screenshot => screenshot.tags.includes(tag))
  );

export const getAllTags = () =>
  Array.from(
    new Set(
      cities.flatMap(city =>
        city.screenshots.flatMap(screenshot => screenshot.tags)
      )
    )
  );

export const getCitiesBySeason = (season: Season) =>
  cities.filter(city =>
    city.screenshots.some(screenshot => screenshot.season === season)
  );

export const getContestWinners = () =>
  cities.filter(city => city.contest?.placement === 'winner');

export const getLatestCities = (limit = 5) =>
  [...cities]
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    )
    .slice(0, limit);
