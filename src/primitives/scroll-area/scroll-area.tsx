import { tw } from '@/utils';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui-components/react/scroll-area';
import { forwardRef } from 'react';

const ScrollAreaRoot = forwardRef<
  HTMLDivElement,
  ScrollAreaPrimitive.Root.Props
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={tw('', className)}
    {...props}
  />
));

ScrollAreaRoot.displayName = 'ScrollArea';

const ScrollAreaViewport = forwardRef<
  HTMLDivElement,
  ScrollAreaPrimitive.Viewport.Props
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    ref={ref}
    className={tw('', className)}
    {...props}
  />
));

ScrollAreaViewport.displayName = 'ScrollAreaViewport';

const ScrollAreaScrollbar = forwardRef<
  HTMLDivElement,
  ScrollAreaPrimitive.Scrollbar.Props
>(({ className, orientation, ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    className={tw(
      orientation === 'vertical' ? 'm-2 flex w-1' : 'm-2 flex h-1',
      'rounded bg-gray-200 opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75',
      className
    )}
    orientation={orientation}
    {...props}
  />
));

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';

const ScrollAreaThumb = forwardRef<
  HTMLDivElement,
  ScrollAreaPrimitive.Thumb.Props
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Thumb
    ref={ref}
    className={tw('w-full rounded bg-gray-500', className)}
    {...props}
  />
));

ScrollAreaThumb.displayName = 'ScrollAreaThumb';

export const ScrollArea = Object.assign(ScrollAreaRoot, {
  Viewport: ScrollAreaViewport,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
});
