import { tw } from '@/utils';
import { Separator as SeparatorPrimitive } from '@base-ui-components/react/separator';
import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

export interface SeparatorProps
  extends ComponentPropsWithoutRef<typeof SeparatorPrimitive> {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => (
    <SeparatorPrimitive
      ref={ref}
      orientation={orientation}
      className={tw(
        'shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        'bg-gray-300',
        className
      )}
      {...props}
    />
  )
);

Separator.displayName = 'Separator';

export { Separator };
