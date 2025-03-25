import { blockInteractions, tw } from '@/utils';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

type EmblaControlProps = {
  display: 'single' | 'multiple';
  type: 'prev' | 'next';
  hide: boolean;
  onClick: () => void;
};

export const EmblaControl = ({
  display,
  type,
  hide,
  onClick,
}: EmblaControlProps) => {
  return (
    <button
      type="button"
      disabled={hide}
      className={tw(
        'pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-3.5 opacity-0 shadow-xl transition group-hover:pointer-events-auto hover:scale-105 hover:bg-gray-200 active:scale-100 active:bg-gray-300',
        type === 'prev'
          ? 'left-7'
          : display === 'single'
            ? 'right-7'
            : 'right-5',
        !hide && 'group-hover:opacity-100'
      )}
      onClick={e => {
        onClick();
        blockInteractions(e, 'prevent');
      }}
      onKeyDown={e => {
        onClick();
        blockInteractions(e, 'prevent');
      }}
    >
      {type === 'prev' ? (
        <ArrowLeft size={20} weight="bold" />
      ) : (
        <ArrowRight size={20} weight="bold" />
      )}
    </button>
  );
};
