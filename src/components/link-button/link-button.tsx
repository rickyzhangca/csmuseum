import { tw } from '@/utils';
import Link from 'next/link';
import React from 'react';

type LinkButtonProps = {
  variant?: 'primary' | 'secondary';
  target?: '_blank' | '_self';
  children: React.ReactNode;
  href: string;
};

const LinkButtonContainer = ({
  variant = 'secondary',
  target = '_blank',
  children,
  href,
}: LinkButtonProps) => {
  const childrenArray = React.Children.toArray(children);

  const leftIcon = childrenArray.find(
    child => React.isValidElement(child) && child.type === linkButtonIconLeft
  );
  const rightIcon = childrenArray.find(
    child => React.isValidElement(child) && child.type === linkButtonIconRight
  );
  const otherChildren = childrenArray.filter(
    child => !React.isValidElement(child) || child.type !== linkButtonIconRight
  );

  return (
    <Link
      href={href}
      target={target}
      className={tw(
        'flex items-center justify-center gap-2 rounded-xl py-2 font-medium transition',
        rightIcon && leftIcon
          ? 'px-5'
          : rightIcon
            ? 'pr-4 pl-5'
            : leftIcon
              ? 'px-4 pl-5'
              : 'px-4',
        variant === 'primary'
          ? 'text-foreground-inverted bg-background-inverted border border-transparent hover:bg-gray-800 hover:shadow-lg'
          : 'text-foreground bg-background border border-gray-300 hover:bg-gray-50 hover:shadow'
      )}
    >
      {leftIcon}
      {otherChildren}
      {rightIcon}
    </Link>
  );
};
LinkButtonContainer.displayName = 'LinkButton';

const linkButtonIconLeft = ({ children }: { children: React.ReactNode }) => {
  return children;
};
linkButtonIconLeft.displayName = 'linkButtonIconLeft';

const linkButtonIconRight = ({ children }: { children: React.ReactNode }) => {
  return children;
};
linkButtonIconRight.displayName = 'linkButtonIconRight';

export const LinkButton = Object.assign(LinkButtonContainer, {
  Icon: linkButtonIconRight,
});
