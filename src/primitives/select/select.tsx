import { tw } from '@/utils';
import { Select as SelectPrimitive } from '@base-ui-components/react/select';
import { CaretUpDown, Check } from '@phosphor-icons/react';
import { forwardRef } from 'react';

const SelectRoot = SelectPrimitive.Root;

const SelectTrigger = forwardRef<
  HTMLButtonElement,
  SelectPrimitive.Trigger.Props
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={tw(
      'flex h-10 min-w-36 items-center justify-between gap-3 rounded-xl border border-gray-200 pr-3 pl-3.5 text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100',
      className
    )}
    {...props}
  />
));

SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = SelectPrimitive.Value;

const SelectIcon = forwardRef<HTMLDivElement, SelectPrimitive.Icon.Props>(
  ({ children, ...props }, ref) => (
    <SelectPrimitive.Icon ref={ref} {...props}>
      {children || <CaretUpDown size={16} className="text-gray-500" />}
    </SelectPrimitive.Icon>
  )
);

const SelectPopup = forwardRef<HTMLDivElement, SelectPrimitive.Popup.Props>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Backdrop />
      <SelectPrimitive.Positioner className="outline-none" sideOffset={8}>
        <SelectPrimitive.Popup
          ref={ref}
          className={tw(
            'group origin-[var(--transform-origin)] rounded-xl bg-[canvas] py-2 text-gray-900 shadow-lg shadow-gray-200 outline outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-100 data-[ending-style]:opacity-100 data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300',
            className
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
        <SelectPrimitive.ScrollDownArrow />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
);

const SelectItem = forwardRef<HTMLDivElement, SelectPrimitive.Item.Props>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={tw(
        'grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.25rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-lg data-[highlighted]:before:bg-gray-200',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="col-start-1">
        <Check size={12} weight="bold" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="col-start-2">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);

const SelectSeparator = forwardRef<
  HTMLDivElement,
  SelectPrimitive.Separator.Props
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={tw('h-px bg-gray-200', className)}
    {...props}
  />
));

const SelectGroup = forwardRef<HTMLDivElement, SelectPrimitive.Group.Props>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Group
      ref={ref}
      className={tw('mb-1', className)}
      {...props}
    />
  )
);

const SelectGroupLabel = forwardRef<
  HTMLDivElement,
  SelectPrimitive.GroupLabel.Props
>(({ className, ...props }, ref) => (
  <SelectPrimitive.GroupLabel
    ref={ref}
    className={tw('text-sm font-medium text-gray-900', className)}
    {...props}
  />
));

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Icon: SelectIcon,
  Value: SelectValue,
  Popup: SelectPopup,
  Item: SelectItem,
  Separator: SelectSeparator,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
});
