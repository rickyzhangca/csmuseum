import { tw } from '@/utils';
import { Dialog as DialogPrimitive } from '@base-ui-components/react/dialog';
import { forwardRef } from 'react';

const DialogRoot = DialogPrimitive.Root;

const DialogTrigger = forwardRef<
  HTMLButtonElement,
  DialogPrimitive.Trigger.Props
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Trigger
    ref={ref}
    className={tw(
      'flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 font-medium hover:bg-gray-200 active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
));

DialogTrigger.displayName = 'DialogTrigger';

const DialogPopup = forwardRef<
  HTMLDivElement,
  DialogPrimitive.Popup.Props & { darkerBackdrop?: boolean }
>(({ className, darkerBackdrop = false, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop
      className={tw(
        'fixed inset-0 bg-black transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
        darkerBackdrop ? 'opacity-80' : 'opacity-20'
      )}
    />
    <DialogPrimitive.Popup
      ref={ref}
      className={tw(
        'scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-p scrollbar-track-transparent fixed top-1/2 left-1/2 max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-gray-50 p-6 text-gray-900 transition duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
        className
      )}
      {...props}
    />
  </DialogPrimitive.Portal>
));

DialogPopup.displayName = 'DialogPopup';

const DialogTitle = forwardRef<HTMLHeadingElement, DialogPrimitive.Title.Props>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={tw('text-lg font-semibold', className)}
      {...props}
    />
  )
);

DialogTitle.displayName = 'DialogTitle';

const DialogDescription = DialogPrimitive.Description;

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Popup: DialogPopup,
  Title: DialogTitle,
  Description: DialogDescription,
});
