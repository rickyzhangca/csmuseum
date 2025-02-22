import { cities } from '@/content';
import { City, Season } from '@/types';

export const getCityBySlug = (slug: string) =>
  cities.find(city => city.slug === slug);

export const getCitiesByRegion = (region: City['region']) =>
  cities.filter(city => city.region === region);

export const getCitiesByTag = (tag: string) =>
  cities.filter(city => city.tags.includes(tag));

export const getAllTags = () =>
  Array.from(new Set(cities.flatMap(city => city.tags)));

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
