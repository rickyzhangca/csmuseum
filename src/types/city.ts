import { withBunny } from '@/utils';
import { z } from 'zod';

const ContestSchema = z.object({
  name: z.string(),
  placement: z.enum(['winner', 'runner-up', 'finalist']),
  year: z.number(),
});

export const CityFrontmatterSchema = z.object({
  slug: z.string(),
  name: z.string(),
  headline: z.string(),
  region: z.string(),
  season: z.string(),
  tags: z.array(z.string()),
  youtube_playlist_url: z.string().url().optional(),
  youtube_playlist_thumbnail: z
    .string()
    .refine(
      val => {
        try {
          new URL(withBunny(val));
          return true;
        } catch {
          return false;
        }
      },
      val => ({
        message: `${val} is not a valid URL after Bunny CDN processing`,
      })
    )
    .optional(),
  screenshots: z.array(
    z.string().refine(
      val => {
        try {
          new URL(withBunny(val));
          return true;
        } catch {
          return false;
        }
      },
      val => ({
        message: `${val} is not a valid URL after Bunny CDN processing`,
      })
    )
  ),
  featured: z.boolean(),
  contest: ContestSchema.optional(),
  date_added: z.string().optional(),
  draft: z.boolean().optional(),
});

export type CityFrontmatter = z.infer<typeof CityFrontmatterSchema>;

export type City = {
  frontmatter: CityFrontmatter;
  content: string;
  slug: string;
};

export type CityMeta = Omit<City, 'content'>;
