import type { Database } from '@/supabase';
import type { ContentType } from '@/types';
import { tw } from '@/utils';
import { Spinner } from '@phosphor-icons/react';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { EmblaControl } from './embla-controls';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
  };
};

const PLACEHOLDER_SRC =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';

type LazyLoadImageProps = {
  imgSrc: string;
  inView: boolean;
  isLastItem: boolean;
  display: 'single' | 'multiple';
  alt: string;
};

const LazyLoadImage = ({
  imgSrc,
  inView,
  isLastItem,
  display,
  alt,
}: LazyLoadImageProps) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView]);

  return (
    <div
      className="flex items-center justify-center"
      style={{
        flex: `0 0 ${display === 'single' ? '100%' : 'auto'}`,
        minWidth: '0',
        maxWidth: display === 'single' ? '100%' : '90%',

        paddingLeft: '20px',
      }}
    >
      <div
        className={tw(
          'relative transition',
          hasLoaded ? 'opacity-100' : 'opacity-0',
          (display === 'single' || isLastItem) && 'pr-5'
        )}
      >
        {!hasLoaded && (
          <div className="flex w-full items-center justify-center p-4">
            <Spinner size={24} className="animate-spin text-gray-500" />
          </div>
        )}
        <img
          onLoad={setLoaded}
          src={inView ? imgSrc : PLACEHOLDER_SRC}
          alt={alt}
          data-src={imgSrc}
          className={tw(
            'm-auto max-h-[480px] rounded-2xl object-cover transition',
            hasLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    </div>
  );
};

export const Embla = ({
  display,
  content,
  selectedShotIndexChange,
  contentType,
  shotsToShow,
}: {
  display: 'single' | 'multiple';
  content:
    | Database['public']['Views']['cities_details']['Row']
    | Database['public']['Views']['shots_details']['Row']
    | Database['public']['Views']['assets_details']['Row'];
  selectedShotIndexChange: (index: number) => void;
  contentType: ContentType;
  shotsToShow: number;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });

  const { selectedIndex } = useDotButton(emblaApi);

  useEffect(() => {
    selectedShotIndexChange(selectedIndex);
  }, [selectedIndex, selectedShotIndexChange]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView(slidesInView => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter(index => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi
      .on('slidesInView', updateSlidesInView)
      .on('reInit', updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return (
    <section className="embla relative max-w-full">
      <EmblaControl
        display={display}
        type="prev"
        hide={prevBtnDisabled}
        onClick={onPrevButtonClick}
      />
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {Array.from({ length: shotsToShow }).map((_, index) => (
            <LazyLoadImage
              display={display}
              key={`${content.id}-${index}`}
              imgSrc={`${import.meta.env.VITE_BUNNY_CDN_URL}/${contentType}/${content.id}/${content.image_ids?.[index]}.webp`}
              inView={slidesInView.indexOf(index) > -1}
              isLastItem={index === shotsToShow - 1}
              alt={`${content.name} - shot ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <EmblaControl
        display={display}
        type="next"
        hide={nextBtnDisabled}
        onClick={onNextButtonClick}
      />
    </section>
  );
};
