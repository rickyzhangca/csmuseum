import { City, CityFrontmatterSchema, CityMeta } from '@/types/city';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const CITIES_PATH = path.join(process.cwd(), 'content/cities');

/**
 * Get all city slugs
 */
export function getCitySlugs(): string[] {
  const files = fs.readdirSync(CITIES_PATH);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

/**
 * Get a single city by slug
 */
export function getCityBySlug(slug: string): City {
  const filePath = path.join(CITIES_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Validate frontmatterw
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
export function getAllCitiesMeta(): CityMeta[] {
  const slugs = getCitySlugs();
  const cities = slugs.map(slug => {
    const city = getCityBySlug(slug);
    const { content, ...meta } = city;
    return meta;
  });

  // Sort by featured first, then alphabetically by title
  return cities.sort((a, b) => {
    if (a.frontmatter.featured === b.frontmatter.featured) {
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    }
    return a.frontmatter.featured ? -1 : 1;
  });
}

/**
 * Get cities filtered by region
 */
export function getCitiesByRegion(region: string): CityMeta[] {
  return getAllCitiesMeta().filter(
    city => city.frontmatter.region.toLowerCase() === region.toLowerCase()
  );
}

/**
 * Get cities filtered by season
 */
export function getCitiesBySeason(season: string): CityMeta[] {
  return getAllCitiesMeta().filter(
    city => city.frontmatter.season.toLowerCase() === season.toLowerCase()
  );
}

/**
 * Get cities filtered by tag
 */
export function getCitiesByTag(tag: string): CityMeta[] {
  return getAllCitiesMeta().filter(city =>
    city.frontmatter.tags.some(
      (t: string) => t.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get featured cities
 */
export function getFeaturedCities(): CityMeta[] {
  return getAllCitiesMeta().filter(city => city.frontmatter.featured);
}
