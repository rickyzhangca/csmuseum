'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { ReactNode } from 'react';
import { SeasonalWeatherReport } from './seasonal-weather-report';
import { TrafficFlowDiagram } from './traffic-flow-diagram';

type ComponentWithChildren = {
  children: ReactNode;
};

// Helper function to safely render children
const safeRender = (children: ReactNode) => {
  if (children === null || children === undefined) return null;
  if (children instanceof RegExp) return children.toString();
  return children;
};

// Define components outside of the main component to avoid recreation
const MDXComponents = {
  SeasonalWeatherReport,
  TrafficFlowDiagram,
  img: ({ src, alt, ...props }: ImageProps) => (
    <div className="my-8">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={1200}
        height={630}
        className="rounded-lg"
        {...props}
      />
    </div>
  ),
  p: ({ children }: ComponentWithChildren) => (
    <p className="mb-4 text-lg leading-relaxed text-gray-700">
      {safeRender(children)}
    </p>
  ),
  h1: ({ children }: ComponentWithChildren) => (
    <h1 className="mb-6 text-4xl font-bold tracking-tight">
      {safeRender(children)}
    </h1>
  ),
  h2: ({ children }: ComponentWithChildren) => (
    <h2 className="mt-12 mb-4 text-3xl font-semibold tracking-tight">
      {safeRender(children)}
    </h2>
  ),
  h3: ({ children }: ComponentWithChildren) => (
    <h3 className="mt-8 mb-3 text-2xl font-semibold tracking-tight">
      {safeRender(children)}
    </h3>
  ),
  ul: ({ children }: ComponentWithChildren) => (
    <ul className="mb-4 list-inside list-disc space-y-2">
      {safeRender(children)}
    </ul>
  ),
  ol: ({ children }: ComponentWithChildren) => (
    <ol className="mb-4 list-inside list-decimal space-y-2">
      {safeRender(children)}
    </ol>
  ),
  li: ({ children }: ComponentWithChildren) => (
    <li className="text-gray-700">{safeRender(children)}</li>
  ),
  strong: ({ children }: ComponentWithChildren) => (
    <strong className="font-semibold">{safeRender(children)}</strong>
  ),
  em: ({ children }: ComponentWithChildren) => (
    <em className="italic">{safeRender(children)}</em>
  ),
  pre: ({ children }: ComponentWithChildren) => (
    <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4">
      {safeRender(children)}
    </pre>
  ),
  code: ({ children }: ComponentWithChildren) => (
    <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
      {safeRender(children)}
    </code>
  ),
};

type MDXClientWrapperProps = {
  source: MDXRemoteSerializeResult;
};

export function MDXClientWrapper({ source }: MDXClientWrapperProps) {
  if (!source) return null;

  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote {...source} components={MDXComponents} />
    </div>
  );
}
