import { tw } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Children, ReactNode, isValidElement } from 'react';

const CityCardContainer = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  const imageComponent = Children.toArray(children).find(
    child => isValidElement(child) && child.type === CityCardImage
  );
  const titleComponent = Children.toArray(children).find(
    child => isValidElement(child) && child.type === CityCardTitle
  );
  const subtitleComponent = Children.toArray(children).find(
    child => isValidElement(child) && child.type === CityCardSubtitle
  );

  return (
    <Link
      href={href}
      className={tw(
        'group flex w-full flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 transition hover:z-40 hover:shadow-lg',
        className
      )}
    >
      <div className="relative aspect-video h-48 w-full overflow-hidden rounded-lg lg:h-auto">
        {imageComponent}
      </div>
      <div className="flex flex-col items-center text-center transition">
        {titleComponent}
        {subtitleComponent}
      </div>
    </Link>
  );
};

const CityCardImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    fill
    className={tw('object-cover transition group-hover:scale-105', className)}
  />
);
CityCardImage.displayName = 'CityCardImage';

const CityCardTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <h4 className={tw('text-foreground', className)}>{children}</h4>;
CityCardTitle.displayName = 'CityCardTitle';

const CityCardSubtitle = ({
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
CityCardSubtitle.displayName = 'CityCardSubtitle';

export const CityCard = Object.assign(CityCardContainer, {
  Image: CityCardImage,
  Title: CityCardTitle,
  Subtitle: CityCardSubtitle,
});
