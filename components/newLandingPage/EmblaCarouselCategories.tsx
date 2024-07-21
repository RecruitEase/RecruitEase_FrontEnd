import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { FieldProps} from "@/types";
import { useRouter } from 'next/navigation';
import { ImSearch } from "react-icons/im";

type PropType = {
  slides: FieldProps[];
  options?: EmblaOptionsType;
};


const EmblaCarouselJobs: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);



  const router = useRouter();

const handleClick = (id: string) => () => {
    router.push(`/jobs?Field=${id}`);
}

  return (
    <section className="embla mt-5">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item) => {
            // Only render pairs, skip odd indexed items
        if (item.key % 2 != 0) {
          const item1 = slides[item.key];
          const item2 = slides[item.key + 1];

if(item1 && item2){
          return (
            <div className="embla__slide grid grid-cols-12 gap-1 grid-rows-2 " key={item1.key} >
              <div role="button"
                tabIndex={item1.key}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleClick(item1.id);
                    }
                  }}
                onClick={handleClick(item1.id)}
                 className="h-[75px] grid grid-cols-12 grid-rows-2 col-span-12 row-span-1 bg-gray-200 dark:bg-gray-50 dark:hover:bg-gray-400 hover:bg-gray-50 cursor-pointer w-full embla__slide__number__new__category p-3  text-gray-800">
                  <div className="flex justify-start items-center col-start-1 col-span-9 row-span-2">
                    {item1.label}
                  </div>
                  <div className="flex justify-end items-start row-span-1 col-span-3 text-medium">
                    <ImSearch />
                  </div>
                  <div className="flex justify-center items-center row-span-1 col-span-3 text-medium">
                    {item1.nJobs} Jobs
                  </div>
                  </div>
              <div role="button"
                tabIndex={item2.key}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleClick(item2.id);
                    }
                  }}
                onClick={handleClick(item2.id)}
                 className="h-[75px] grid grid-cols-12 grid-rows-2 col-span-12 row-span-1 bg-gray-200 dark:bg-gray-50 dark:hover:bg-gray-400 hover:bg-gray-50 cursor-pointer w-full embla__slide__number__new__category p-3  text-gray-800">
                  <div className="flex justify-start items-center col-start-1 col-span-9 row-span-2">
                    {item2.label}
                  </div>
                  <div className="flex justify-end items-start row-span-1 col-span-3 text-medium">
                    <ImSearch />
                  </div>
                  <div className="flex justify-center items-center row-span-1 col-span-3 text-medium">
                    {item2.nJobs} Jobs
                  </div>
                  </div>
             
              </div>
          )}}})}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarouselJobs;
