import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area';
import { ReactNode } from 'react';

type HorizontalScrollableProps = {
  className?: string;
  children: ReactNode;
};

export const HorizontalScrollable = ({
  className,
  children,
}: HorizontalScrollableProps) => {
  return (
    <ScrollArea className={className}>
      <ScrollAreaViewport className="h-full w-full overflow-x-auto">
        <div className="mb-4">{children}</div>
        <ScrollAreaScrollbar
          orientation="horizontal"
          className="flex h-2.5 touch-none flex-col border-t border-t-transparent p-[1px] transition select-none"
        >
          <ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-950/10" />
        </ScrollAreaScrollbar>
      </ScrollAreaViewport>
    </ScrollArea>
  );
};
