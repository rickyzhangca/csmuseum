'use client';

import { tw } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

type HorizontalScrollableProps = {
  className?: string;
  children: ReactNode;
};

export const HorizontalScrollable = ({
  className,
  children,
}: HorizontalScrollableProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollable = () => {
    if (!viewportRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!viewportRef.current) return;
    const scrollAmount = viewportRef.current.clientWidth / 2;
    viewportRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={tw('group/scrollable relative', className)}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="bg-background absolute top-1/2 left-2 z-50 hidden -translate-y-1/2 cursor-pointer rounded-full p-3 opacity-0 shadow-lg transition group-hover/scrollable:opacity-100 hover:bg-gray-50 hover:shadow-xl active:bg-gray-200 sm:block"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="size-6" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="bg-background absolute top-1/2 right-2 z-50 hidden -translate-y-1/2 cursor-pointer rounded-full p-3 opacity-0 shadow-lg transition group-hover/scrollable:opacity-100 hover:bg-gray-50 hover:shadow-xl active:bg-gray-200 sm:block"
          aria-label="Scroll right "
        >
          <ChevronRightIcon className="size-6" />
        </button>
      )}
      <div
        ref={viewportRef}
        className="scrollbar-thumb-foreground/15 scrollbar-track-transparent scrollbar h-full w-full snap-x overflow-x-auto"
        onScroll={checkScrollable}
      >
        <div className="mb-2 flex">{children}</div>
        {/* <ScrollAreaScrollbar
            orientation="horizontal"
            className="flex h-2.5 touch-none flex-col border-t border-t-transparent p-[1px] transition select-none"
          >
            <ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-950/10" />
          </ScrollAreaScrollbar> */}
      </div>
    </div>
  );
};
