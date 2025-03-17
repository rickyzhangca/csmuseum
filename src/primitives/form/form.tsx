import { tw } from '@/utils';
import { Form as FormPrimitive } from '@base-ui-components/react/form';
import { forwardRef } from 'react';

export const Form = forwardRef<HTMLFormElement, FormPrimitive.Props>(
  ({ className, ...props }, ref) => (
    <FormPrimitive
      ref={ref}
      className={tw('flex flex-col gap-4', className)}
      {...props}
    />
  )
);
