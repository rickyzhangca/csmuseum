import { tw } from '@/utils/tw';
import { Children, isValidElement, memo, useMemo } from 'react';
import {
  HeaderChild,
  SectionChipProps,
  SectionContentProps,
  SectionDescriptionProps,
  SectionHeaderProps,
  SectionRootProps,
  SectionTitleProps,
} from './types';

const isHeaderChild = (child: unknown): child is HeaderChild =>
  isValidElement(child) && typeof child.type !== 'string';

const SectionRoot = ({ children, className }: SectionRootProps) => (
  <section
    className={tw(
      'my-12 flex flex-col gap-6 sm:my-16 sm:gap-8 lg:my-24',
      className
    )}
  >
    {children}
  </section>
);
SectionRoot.displayName = 'Section';

const SectionChip = ({ children, className }: SectionChipProps) => (
  <span
    className={tw(
      'inline-flex cursor-default items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-600',
      className
    )}
  >
    {children}
  </span>
);
SectionChip.displayName = 'Section.Chip';

const SectionHeader = memo(({ children, className }: SectionHeaderProps) => {
  const chip = useMemo(
    () =>
      Children.toArray(children).find(
        child => isHeaderChild(child) && child.type === SectionChip
      ),
    [children]
  );

  const otherChildren = useMemo(
    () =>
      Children.toArray(children).filter(
        child => !isHeaderChild(child) || child.type !== SectionChip
      ),
    [children]
  );

  return (
    <div
      className={tw(
        'flex flex-col items-center gap-4 text-center sm:gap-7',
        className
      )}
    >
      {chip}
      {otherChildren.length > 0 && (
        <div className="flex flex-col gap-2">{otherChildren}</div>
      )}
    </div>
  );
});
SectionHeader.displayName = 'Section.Header';

const SectionTitle = ({ children, className }: SectionTitleProps) => (
  <h2 className={tw(className)}>{children}</h2>
);
SectionTitle.displayName = 'Section.Title';

const SectionDescription = ({
  children,
  className,
}: SectionDescriptionProps) => (
  <p className={tw('text-lg text-gray-500', className)}>{children}</p>
);
SectionDescription.displayName = 'Section.Description';

const SectionContent = ({ children, className }: SectionContentProps) => (
  <div className={tw(className)}>{children}</div>
);
SectionContent.displayName = 'Section.Content';

export const Section = Object.assign(SectionRoot, {
  Header: SectionHeader,
  Chip: SectionChip,
  Title: SectionTitle,
  Description: SectionDescription,
  Content: SectionContent,
});
