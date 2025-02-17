import { MDXClientWrapper } from '@/components/mdx/mdx-client-wrapper';
import { serialize } from 'next-mdx-remote/serialize';

type MDXContentProps = {
  content: string;
};

export async function MDXContent({ content }: MDXContentProps) {
  if (!content) return null;

  try {
    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
        remarkPlugins: [],
        rehypePlugins: [],
        format: 'mdx',
      },
    });

    return <MDXClientWrapper source={mdxSource} />;
  } catch (error) {
    console.error('Error serializing MDX:', error);
    return <div>Error loading content</div>;
  }
}
