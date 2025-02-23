import { tw } from '@/utils';
import Image from 'next/image';
import { Children, ReactNode, isValidElement } from 'react';
import { HorizontalScrollable } from '../horizontal-scrollable';
import { LinkButton } from '../link-button';

const CityGalleryContainer = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  const imageComponents = Children.toArray(children).filter(
    child => isValidElement(child) && child.type === CityGalleryImage
  );
  const titleComponent = Children.toArray(children).find(
    child => isValidElement(child) && child.type === CityGalleryTitle
  );
  const subtitleComponent = Children.toArray(children).find(
    child => isValidElement(child) && child.type === CityGallerySubtitle
  );

  return (
    <div
      className={tw(
        'group flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition',
        className
      )}
    >
      <div className="bg-background flex items-center justify-between border-b border-gray-200 px-5 py-3 shadow-xs">
        <div className="flex flex-col text-start">
          {titleComponent}
          {subtitleComponent}
        </div>
        <LinkButton href={href} className="hidden sm:block" target="_self">
          View city
        </LinkButton>
        <LinkButton href={href} className="block sm:hidden" target="_self">
          View
        </LinkButton>
      </div>
      <HorizontalScrollable className="mb-px bg-gradient-to-b from-gray-100 to-transparent pt-4">
        <div className="flex items-center gap-2 px-4">
          {imageComponents.map(imageComponent => imageComponent)}
        </div>
      </HorizontalScrollable>
    </div>
  );
};

const CityGalleryImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className="relative aspect-video h-64 snap-center overflow-hidden rounded-lg md:h-80 lg:h-[480px]">
    <Image
      src={src}
      alt={alt}
      fill
      className={tw('object-cover transition select-none', className)}
    />
  </div>
);
CityGalleryImage.displayName = 'CityGalleryImage';

const CityGalleryTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <h4 className={tw('text-foreground', className)}>{children}</h4>;
CityGalleryTitle.displayName = 'CityGalleryTitle';

const CityGallerySubtitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <p className={tw('text-foreground/50 text-sm transition', className)}>
    {children}
  </p>
);
CityGallerySubtitle.displayName = 'CityGallerySubtitle';

export const CityGallery = Object.assign(CityGalleryContainer, {
  Image: CityGalleryImage,
  Title: CityGalleryTitle,
  Subtitle: CityGallerySubtitle,
});
