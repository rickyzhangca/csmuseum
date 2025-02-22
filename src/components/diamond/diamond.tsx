import { tw } from '@/utils';

type DiamondProps = {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
};

export const Diamond = ({ position, className }: DiamondProps) => {
  return (
    <div
      className={tw(
        'absolute z-10 h-2 w-2 rotate-45 rounded-[1px]',
        position === 'top-left' && 'top-[-4.5px] right-[-4.5px]',
        position === 'top-right' && 'top-[-4.5px] left-[-4.5px]',
        position === 'bottom-left' && 'right-[-4.5px] bottom-[-4.5px]',
        position === 'bottom-right' && 'bottom-[-4.5px] left-[-4.5px]',
        'border border-zinc-300 bg-white',
        className
      )}
    />
  );
};
