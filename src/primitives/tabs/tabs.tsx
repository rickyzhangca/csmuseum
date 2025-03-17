import { tw } from '@/utils';
import { Tabs as TabsPrimitive } from '@base-ui-components/react/tabs';
import { forwardRef } from 'react';

const TabsRoot = forwardRef<HTMLDivElement, TabsPrimitive.Root.Props>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Root
      ref={ref}
      className={tw('flex flex-col gap-4', className)}
      {...props}
    />
  )
);

const TabsList = forwardRef<HTMLDivElement, TabsPrimitive.Root.Props>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={tw(
        'relative z-0 flex gap-1 rounded-xl bg-gray-200 p-1.5',
        className
      )}
      {...props}
    />
  )
);

const TabsTab = forwardRef<HTMLDivElement, TabsPrimitive.Tab.Props>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Tab
      ref={ref}
      className={tw(
        'text flex h-10 items-center justify-center rounded-lg border-0 px-4 font-medium text-gray-500 outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-blue-800 hover:text-gray-800 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline-2 data-[selected]:text-gray-900',
        className
      )}
      {...props}
    />
  )
);

const TabsIndicator = forwardRef<HTMLDivElement, TabsPrimitive.Indicator.Props>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Indicator
      ref={ref}
      className={tw(
        'absolute top-1/2 left-0 z-[-1] h-10 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-lg bg-white transition-all duration-200 ease-in-out',
        className
      )}
      {...props}
    />
  )
);

const TabsPanel = forwardRef<HTMLDivElement, TabsPrimitive.Panel.Props>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Panel
      ref={ref}
      className={tw(
        'relative flex items-center justify-center rounded-lg -outline-offset-1 outline-blue-800 focus-visible:outline-2',
        className
      )}
      {...props}
    />
  )
);

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panel: TabsPanel,
});
