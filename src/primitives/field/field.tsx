import { tw } from '@/utils';
import { Field as FieldPrimitive } from '@base-ui-components/react/field';
import { forwardRef } from 'react';

const FieldRoot = forwardRef<HTMLDivElement, FieldPrimitive.Root.Props>(
  ({ className, ...props }, ref) => (
    <FieldPrimitive.Root ref={ref} className={tw('', className)} {...props} />
  )
);

const FieldControl = forwardRef<HTMLInputElement, FieldPrimitive.Control.Props>(
  ({ className, ...props }, ref) => (
    <FieldPrimitive.Control
      ref={ref}
      className={tw(
        'h-10 w-full rounded-xl border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:-outline-offset-1 focus:outline-blue-800',
        className
      )}
      {...props}
    />
  )
);

const FieldDescription = forwardRef<
  HTMLDivElement,
  FieldPrimitive.Description.Props
>(({ className, ...props }, ref) => (
  <FieldPrimitive.Description
    ref={ref}
    className={tw('', className)}
    {...props}
  />
));

const FieldError = forwardRef<HTMLDivElement, FieldPrimitive.Error.Props>(
  ({ className, ...props }, ref) => (
    <FieldPrimitive.Error
      ref={ref}
      className={tw('text-sm text-red-800', className)}
      {...props}
    />
  )
);

const FieldLabel = forwardRef<HTMLDivElement, FieldPrimitive.Label.Props>(
  ({ className, ...props }, ref) => (
    <FieldPrimitive.Label ref={ref} className={tw('', className)} {...props} />
  )
);

export const Field = Object.assign(FieldRoot, {
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
  Label: FieldLabel,
});
