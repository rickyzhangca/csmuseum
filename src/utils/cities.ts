'use server';

import { City, CityFrontmatterSchema, CityMeta } from '@/types/city';
import matter from 'gray-matter';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const CITIES_PATH = path.join(process.cwd(), 'content/cities');

/**
 * Get all city slugs
 */
export async function getCitySlugs(): Promise<string[]> {
  const files = readdirSync(CITIES_PATH);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

/**
 * Get a single city by slug
 */
export async function getCityBySlug(slug: string): Promise<City> {
  const filePath = path.join(CITIES_PATH, `${slug}.mdx`);
  const fileContents = readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Validate frontmatter
  const frontmatter = CityFrontmatterSchema.parse(data);

  return {
    frontmatter,
    content,
    slug,
  };
}

/**
 * Get all cities metadata (without content)
 */
export async function getAllCitiesMeta(): Promise<CityMeta[]> {
  const slugs = await getCitySlugs();
  const cities = await Promise.all(
    slugs.map(async slug => {
      const city = await getCityBySlug(slug);
      const { content, ...meta } = city;
      return meta;
    })
  );

  // Sort by featured first, then alphabetically by name
  return cities.sort((a, b) => {
    if (a.frontmatter.featured === b.frontmatter.featured) {
      return a.frontmatter.name.localeCompare(b.frontmatter.name);
    }
    return a.frontmatter.featured ? -1 : 1;
  });
}

/**
 * Get cities filtered by region
 */
export async function getCitiesByRegion(region: string): Promise<CityMeta[]> {
  const cities = await getAllCitiesMeta();
  return cities.filter(
    city => city.frontmatter.region.toLowerCase() === region.toLowerCase()
  );
}

/**
 * Get cities filtered by season
 */
export async function getCitiesBySeason(season: string): Promise<CityMeta[]> {
  const cities = await getAllCitiesMeta();
  return cities.filter(
    city => city.frontmatter.season.toLowerCase() === season.toLowerCase()
  );
}

/**
 * Get cities filtered by tag
 */
export async function getCitiesByTag(tag: string): Promise<CityMeta[]> {
  const cities = await getAllCitiesMeta();
  return cities.filter(city =>
    city.frontmatter.tags.some(
      (t: string) => t.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get featured cities
 */
export async function getFeaturedCities(): Promise<CityMeta[]> {
  const cities = await getAllCitiesMeta();
  return cities.filter(city => city.frontmatter.featured);
}
