import type { KeyboardEvent, MouseEvent } from 'react';

export const blockInteractions = (
  e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  mode: 'stop' | 'prevent'
) => {
  if (mode === 'stop') e.stopPropagation();
  else e.preventDefault();
};
