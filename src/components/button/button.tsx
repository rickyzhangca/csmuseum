import { tw } from '@/utils';
import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
};

const ButtonContainer = ({
  variant = 'secondary',
  onClick,
  children,
}: ButtonProps) => {
  const childrenArray = React.Children.toArray(children);

  const leftIcon = childrenArray.find(
    child => React.isValidElement(child) && child.type === ButtonIconLeft
  );
  const rightIcon = childrenArray.find(
    child => React.isValidElement(child) && child.type === ButtonIconRight
  );
  const otherChildren = childrenArray.filter(
    child => !React.isValidElement(child) || child.type !== ButtonIconRight
  );

  return (
    <button
      onClick={onClick}
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
    </button>
  );
};
ButtonContainer.displayName = 'Button';

const ButtonIconLeft = ({ children }: { children: React.ReactNode }) => {
  return children;
};
ButtonIconLeft.displayName = 'ButtonIconLeft';

const ButtonIconRight = ({ children }: { children: React.ReactNode }) => {
  return children;
};
ButtonIconRight.displayName = 'ButtonIconRight';

export const Button = Object.assign(ButtonContainer, {
  Icon: ButtonIconRight,
});
