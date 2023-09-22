import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { IconChevronLeft } from '../icons/IconChevronLeft';
import { IconChevronRight } from '../icons/IconChevronRight';
import debounce from '../../utils/debounce';
import { ButtonNav } from '../ButtonNav';
import { twMerge } from 'tailwind-merge';

export const ImageCarousel: React.FC<PropsWithChildren> = ({ children }) => {
  const carousel = useRef<HTMLDivElement | null>(null);
  const [slidesTotal, setSlidesTotal] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const handleScroll = debounce((): void => {
    if (!carousel.current) return;
    setActiveSlide(
      Math.ceil(
        carousel.current.scrollLeft /
          carousel.current.getBoundingClientRect().width
      )
    );
  }, 100);

  const handleSlideClick = (index: number): void => {
    setActiveSlide(index);
    carousel.current?.scrollTo({
      left: carousel.current.getBoundingClientRect().width * index,
    });
  };

  useEffect(() => {
    if (!carousel.current) return;
    const slides: NodeListOf<HTMLSpanElement> =
      carousel.current.querySelectorAll('.image-carousel-content > *');

    setSlidesTotal(slides.length);

    const initCarousel = (): void => {
      if (!carousel.current) return;

      let maxHeight = 0;
      carousel.current.style.height = 'auto';

      slides.forEach((slide: HTMLSpanElement): void => {
        slide.classList.add('slide');
        const slideHeight = slide.getBoundingClientRect().height;
        if (slideHeight > maxHeight) maxHeight = slideHeight;
        const img = slide.querySelector('img');
        if (
          !img?.title ||
          img.title === '' ||
          slide.querySelector('.slide-caption')
        )
          return;
        slide.insertAdjacentHTML(
          'beforeend',
          `<div class="slide-caption">${img.title}</div>`
        );
      });

      carousel.current.style.height = `${maxHeight}px`;
    };

    initCarousel();

    window.addEventListener('resize', initCarousel);

    carousel.current.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', initCarousel);
      carousel.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="image-carousel-container relative">
      <div
        className="image-carousel snap-x snap-mandatory overflow-hidden overflow-x-auto scroll-smooth"
        ref={carousel}
      >
        <div className="image-carousel-content group flex [&>span]:h-full [&>span]:w-full [&>span]:shrink-0 [&>span]:snap-center">
          {children}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-8">
        <ButtonNav
          className="absolute left-0 top-[50%] -translate-y-[50%] text-white"
          onClick={() => handleSlideClick(activeSlide - 1)}
          disabled={activeSlide === 0}
          title="Previous image"
        >
          <span className="inline-flex h-5 w-5">
            <IconChevronLeft />
          </span>
          <span className="sr-only">Previous</span>
        </ButtonNav>
        <div className="absolute left-0 text-sm text-neutral-500">
          {activeSlide + 1} of {slidesTotal}
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          {[...Array(slidesTotal).keys()].map((_, index) => (
            <button
              key={index}
              className={twMerge(
                'h-3 w-3 overflow-hidden rounded-full transition-all duration-300 focus:bg-action-reg',
                activeSlide === index
                  ? 'bg-action-reg'
                  : 'bg-neutral-300 hover:bg-neutral-400'
              )}
              onClick={() => handleSlideClick(index)}
              disabled={activeSlide === index}
              title={`Go to ${index + 1}`}
            >
              <span className="sr-only">Go to {index + 1}</span>
            </button>
          ))}
        </div>
        <ButtonNav
          className="absolute right-0 top-[50%] -translate-y-[50%]"
          onClick={() => handleSlideClick(activeSlide + 1)}
          disabled={activeSlide === slidesTotal - 1}
          title="Next image"
        >
          <span className="inline-flex h-5 w-5">
            <IconChevronRight />
          </span>
          <span className="sr-only">Next</span>
        </ButtonNav>
      </div>
    </div>
  );
};
