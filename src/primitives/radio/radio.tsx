import { tw } from '@/utils';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui-components/react';
import { Radio as RadioPrimitive } from '@base-ui-components/react/radio';
import { forwardRef } from 'react';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupPrimitive.Props>(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive
      ref={ref}
      className={tw('flex flex-col gap-1', className)}
      {...props}
    />
  )
);

RadioGroup.displayName = 'RadioGroup';

const RadioRoot = forwardRef<HTMLButtonElement, RadioPrimitive.Root.Props>(
  ({ className, ...props }, ref) => (
    <RadioPrimitive.Root
      ref={ref}
      className={tw(
        'flex size-5 items-center justify-center rounded-full outline-none focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-[checked]:bg-gray-900 data-[unchecked]:border data-[unchecked]:border-gray-300',
        className
      )}
      {...props}
    />
  )
);

RadioRoot.displayName = 'Radio';

const RadioIndicator = forwardRef<
  HTMLDivElement,
  RadioPrimitive.Indicator.Props
>(({ className, ...props }, ref) => (
  <RadioPrimitive.Indicator
    ref={ref}
    className={tw(
      'flex before:size-2 before:rounded-full before:bg-gray-50 data-[unchecked]:hidden',
      className
    )}
    {...props}
  />
));

RadioIndicator.displayName = 'RadioIndicator';

export const Radio = Object.assign(RadioRoot, { Indicator: RadioIndicator });
