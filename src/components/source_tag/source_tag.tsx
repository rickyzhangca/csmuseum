import { type URLType, urlTypeNames } from '@/types';
import { blockInteractions, tw } from '@/utils';
import { GlobeSimple, XLogo, YoutubeLogo } from '@phosphor-icons/react';

type SourceTagProps = {
  href: string;
  sourceType: URLType;
};

export const SourceTag = ({ href, sourceType }: SourceTagProps) => {
  const Content = () => (
    <div
      className={tw(
        'group/source-tag flex w-8 items-center justify-start gap-1.5 rounded-lg bg-gray-900/40 px-2 py-1 text-sm font-medium text-white transition-[width] hover:w-full',
        href && 'hover:bg-gray-900/50'
      )}
      onClick={e => blockInteractions(e, 'stop')}
      onKeyDown={e => blockInteractions(e, 'stop')}
    >
      {sourceType === 'youtube' ? (
        <YoutubeLogo size={16} weight="fill" className="min-w-4" />
      ) : sourceType === 'twitter' ? (
        <XLogo size={16} className="min-w-4" />
      ) : (
        <GlobeSimple size={16} className="min-w-4" />
      )}
      <span className="opacity-0 transition group-hover/source-tag:opacity-100">
        {urlTypeNames[sourceType]}
      </span>
    </div>
  );

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Content />
    </a>
  );
};
