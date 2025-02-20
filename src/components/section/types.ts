import { ComponentType } from 'react';

import { ReactNode } from 'react';

export type SectionRootProps = {
  children: ReactNode;
  className?: string;
};

export type SectionChipProps = {
  children: ReactNode;
  className?: string;
};

export type SectionHeaderProps = {
  children: ReactNode;
  className?: string;
};

export type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export type SectionDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export type SectionContentProps = {
  children: ReactNode;
  className?: string;
};

export type HeaderChild = {
  type: ComponentType<ReactNode>;
  props: Record<string, unknown>;
};
