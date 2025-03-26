import { blockInteractions, tw } from '@/utils';
import { Link, type LinkProps } from '@tanstack/react-router';
import type { ReactNode } from 'react';

type TagProps = {
  children: ReactNode;
  href?: string;
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  params?: LinkProps['params'];
};

export const Tag = ({ children, href, to, target, params }: TagProps) => {
  const Content = ({ withHandlers = false }) => (
    <div
      className={tw(
        'flex items-center gap-1.5 rounded-lg bg-gray-900/40 px-2 py-1 text-sm font-medium text-white transition',
        (to || href) && 'hover:bg-gray-900/50',
        !(to || href) && 'cursor-default'
      )}
      {...(withHandlers && {
        onClick: e => blockInteractions(e, to || href ? 'stop' : 'prevent'),
        onKeyDown: e => blockInteractions(e, to || href ? 'stop' : 'prevent'),
      })}
    >
      {children}
    </div>
  );

  if (!to && !href) return <Content />;

  if (href) {
    return (
      <a href={href} target={target} rel="noreferrer">
        <Content withHandlers />
      </a>
    );
  }

  return (
    <Link to={to} target={target} params={params}>
      <Content />
    </Link>
  );
};
