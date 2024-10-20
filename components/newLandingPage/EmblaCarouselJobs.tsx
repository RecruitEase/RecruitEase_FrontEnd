import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { JobProps } from "@/types";
import { Card, CardBody } from "@nextui-org/react";
import { ImBriefcase, ImLocation } from "react-icons/im";
import { useRouter } from 'next/navigation';
import {Job} from "@/types/job";
import {RecruiterProp} from "@/types/users";
import {daysLeft} from "@/utils/stringUtils";
import {toTitleCase} from "@/lib/utils";
import {jobTypes, locations} from "@/components/recruiter/data";
type PropType = {
  slides: Job[];
  recruiters:RecruiterProp[];
  options?: EmblaOptionsType;
};


const EmblaCarouselJobs: React.FC<PropType> = (props) => {
  const { slides, options ,recruiters} = props;
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
    router.push(`/jobs/${id}`);
}

  return (
    <section className="embla mt-5">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item) => {
            console.log("item-recruiter",item.recruiterId)
            console.log("abc",recruiters)

            const currentRecruiter=recruiters.find(r=>r.recruiterId==item.recruiterId!);
            const userProfilePic=(currentRecruiter?.profilePic)?process.env.NEXT_PUBLIC_S3_URL+currentRecruiter.profilePic : "/profileImages/noImage.png";
            return (
                <div className="embla__slide " key={item.jobId}>
                  <div
                      key={item.jobId}
                      className="bg-gray-200 dark:bg-gray-50 dark:hover:bg-gray-400 hover:bg-gray-50 cursor-pointer w-full embla__slide__number__new p-5 grid grid-cols-12 grid-rows-9 gap-1 text-gray-800"
                      role="button"
                      tabIndex={item.jobId!}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleClick(item.jobId!);
                        }
                      }}
                      onClick={handleClick(item.jobId!)}

                  >
                    <div className="col-start-1 col-span-3 row-end-4 row-span-3 ">
                      <img
                          src={userProfilePic}
                          className="rounded-[0.52vw] opacity-100 h-full"
                          alt={`${currentRecruiter?.companyName} Logo`}
                      />
                    </div>
                    <div className="col-start-8 col-span-1 flex items-center justify-end">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          className="  flex items-center justify-center fill-gray-600"
                      >
                        <path
                            d="M4117,14a7,7,0,1,1,7-7A7.009,7.009,0,0,1,4117,14Zm-3.259-7.306a.565.565,0,1,0,0,1.13h3.518a.566.566,0,0,0,.566-.565V2.741a.564.564,0,1,0-1.129,0V6.694Z"
                            transform="translate(-4110)"
                        ></path>
                      </svg>
                    </div>
                    <div className="row-start-1 row-span-1 col-start-9 col-span-4 flex items-center justify-end">
                      {daysLeft(item.deadline)}
                    </div>

                    <div
                        className="col-start-1 col-end-12 row-start-4 row-end-6 flex justify-start items-end text-left font-bold lg:text-xl  md:text-large text-xl text-black whitespace-nowrap overflow-hidden">
                      {toTitleCase(item.title)}
                    </div>
                    <button
                        className="col-start-12 col-end-13 row-start-4 row-end-6 flex items-end justify-center bg-transparent hover:fill-black">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="20.452"
                          viewBox="0 0 13 20.452"
                          className=" fill-none hover:fill-gray-600"
                      >
                        <g transform="translate(-4110)">
                          <path
                              d="M4110.594,20.452h0a1.988,1.988,0,0,1-.594-1.423V2a2,2,0,0,1,2-2h9a2,2,0,0,1,2,2V19.029a1.985,1.985,0,0,1-.594,1.422L4116.5,14.72l-5.906,5.732Z"
                              stroke="none"
                          ></path>
                          <path
                              d="M 4111.99951171875 16.30070114135742 L 4116.5 11.93320178985596 L 4121 16.3002815246582 L 4121.00146484375 2.003021955490112 C 4121.00048828125 2.001999378204346 4120.9990234375 2.000409603118896 4120.99951171875 2.000001907348633 L 4112.0029296875 1.998752117156982 C 4112.001953125 1.99932873249054 4112 2.000790596008301 4111.99951171875 2.000790596008301 C 4111.99951171875 2.000790596008301 4111.99951171875 2.00078272819519 4111.99951171875 2.000766515731812 L 4111.99951171875 16.30070114135742 M 4110.59375 20.45248222351074 L 4110.59326171875 20.45179176330566 C 4110.21044921875 20.0728816986084 4109.99951171875 19.56753158569336 4109.99951171875 19.02881240844727 L 4109.99951171875 2.000142097473145 C 4109.99951171875 0.8972620368003845 4110.89697265625 2.065429725917056e-06 4112 2.065429725917056e-06 L 4121 2.065429725917056e-06 C 4122.10302734375 2.065429725917056e-06 4123 0.8972620368003845 4123 2.000142097473145 L 4123 19.02881240844727 C 4123 19.56734275817871 4122.7890625 20.07246208190918 4122.40576171875 20.45111274719238 L 4116.5 14.7201623916626 L 4110.59375 20.45248222351074 Z"
                              stroke="none"
                              fill="#909090"
                          ></path>
                        </g>
                      </svg>
                    </button>
                    <div
                        className="col-start-1 col-end-12 row-start-6 row-end-7 flex justify-start  text-left  text-medium text-black whitespace-nowrap overflow-hidden">
                      {currentRecruiter?.companyName}
                    </div>
                    <div
                        className="col-start-1 col-span-1 row-start-8 row-span-1 flex justify-center items-center overflow-hidden">
                      <ImLocation size={17}/>
                    </div>
                    <div
                        className="col-start-2 col-end-12 row-start-8 row-span-1 flex justify-start items-center overflow-hidden">
                      {locations.find(x => x.key ==item.location)!.label}
                    </div>
                    <div
                        className="col-start-1 col-span-1 row-start-9 row-span-1 flex justify-center items-center overflow-hidden">
                      <ImBriefcase size={17}/>
                    </div>
                    <div
                        className="col-start-2 col-end-12 row-start-9 row-span-1 flex justify-start items-center overflow-hidden">
                      {jobTypes.find(x => x.key == item.type)?.label}
                    </div>
                  </div>
                </div>
            )
          })}
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
