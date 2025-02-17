import { z } from 'zod';

export const CityFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  region: z.string(),
  season: z.string(),
  tags: z.array(z.string()),
  youtube: z.string().url().optional(),
  screenshots: z.array(z.string().url()),
  featured: z.boolean(),
  stats: z.object({
    population: z.string(),
    traffic: z.union([
      z.number(),
      z.string().transform(val => {
        const num = parseFloat(val.replace('%', ''));
        return isNaN(num) ? 0 : num;
      }),
    ]),
    mods: z.number(),
  }),
});

export type CityFrontmatter = z.infer<typeof CityFrontmatterSchema>;

export type City = {
  frontmatter: CityFrontmatter;
  content: string;
  slug: string;
};

export type CityMeta = Omit<City, 'content'>;
