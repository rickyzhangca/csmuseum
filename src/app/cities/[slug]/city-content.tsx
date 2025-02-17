'use client';

import { MDXContent } from './mdx-content';

type CityContentProps = {
  content: string;
};

export function CityContent({ content }: CityContentProps) {
  return <MDXContent content={content} />;
}
