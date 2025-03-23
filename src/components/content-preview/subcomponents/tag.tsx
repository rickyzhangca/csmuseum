import { blockInteractions, tw } from '@/utils';
import { Link, type LinkProps } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Tag = ({
  children,
  to,
  target,
}: {
  children: ReactNode;
  to?: string;
  target?: LinkProps['target'];
}) => {
  const Content = () => (
    <div
      className={tw(
        'flex items-center gap-1.5 rounded-lg bg-gray-900/40 px-2 py-1 text-sm font-medium text-white transition',
        to && 'hover:bg-gray-900/50',
        !to && 'cursor-default'
      )}
      onClick={e => blockInteractions(e, to ? 'stop' : 'prevent')}
      onKeyDown={e => blockInteractions(e, to ? 'stop' : 'prevent')}
    >
      {children}
    </div>
  );

  if (!to) return <Content />;

  if (to.startsWith('http')) {
    return (
      <a href={to} target={target}>
        <Content />
      </a>
    );
  }

  return (
    <Link to={to} target={target}>
      <Content />
    </Link>
  );
};
