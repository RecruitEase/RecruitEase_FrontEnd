import React, {useCallback} from 'react'
import {EmblaOptionsType, EmblaCarouselType} from 'embla-carousel'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import {JobProps} from "@/types";
import {Card, CardBody} from "@nextui-org/react";
import {ImBriefcase, ImLocation} from "react-icons/im";

type PropType = {
    slides: JobProps[]
    options?: EmblaOptionsType
}
const item=    {
        key: 1,
        logo: '/assets/landing/1.jpg',
        title: 'Officer - Customer Verification',
        company: 'Dialog Finance PLC',
        location: 'Colombo, Western Province',
        type: 'Full-Time',
        daysLeft: '7',
    };

const EmblaCarousel: React.FC<PropType> = (props) => {
    const {slides, options} = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        resetOrStop()
    }, [])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi, onNavButtonClick)

    return (
        <section className="embla mt-5">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {/*{slides.map((item) => (*/}
                        <div className="embla__slide" key={item.key}>

                            <div
                                key={item.key}
                                className="w-full embla__slide__number "
                            >
                                <div
                                    className="w-full flex flex-col rounded-[10px] transition-all duration-300 ease-in-out cursor-pointer  pl-[1.04vw] h-full bg-gray-200 hover:bg-gray-50 hover:border-gray-200 hover:border-1">
                                    <div className="flex items-start p-2">
                                        <img
                                            src={item.logo}
                                            className="w-[5rem] h-[5rem] rounded-[0.52vw] opacity-100 object-contain"
                                            alt={`${item.company} Logo`}
                                        />
                                        <div
                                            className="ml-auto mr-3 mt-[0.13vw] h-[0.88vw] text-[0.78vw] text-gray-600 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                className="w-[0.78vw] h-[0.78vw] mr-[0.73vw] flex items-center justify-center fill-gray-600"
                                            >
                                                <path
                                                    d="M4117,14a7,7,0,1,1,7-7A7.009,7.009,0,0,1,4117,14Zm-3.259-7.306a.565.565,0,1,0,0,1.13h3.518a.566.566,0,0,0,.566-.565V2.741a.564.564,0,1,0-1.129,0V6.694Z"
                                                    transform="translate(-4110)"
                                                ></path>
                                            </svg>
                                            {item.daysLeft} days left
                                        </div>
                                        <div className="flex flex-col"></div>
                                    </div>
                                    <div className="flex items-center h-[1.82vw] mt-[0.21vw] pr-2">
      <span className="text-left font-bold text-[1.04vw] text-black whitespace-nowrap max-w-[90%] overflow-hidden">
        {item.title}
      </span>
                                        <button className="flex items-center bg-transparent ml-auto mr-3 w-fit hover:fill-black" >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="13"
                                                height="20.452"
                                                viewBox="0 0 13 20.452"
                                                className="w-[0.67vw] h-[1.041vw] fill-none hover:fill-gray-600"
                                            >
                                                <g
                                                    transform="translate(-4110)"

                                                >
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
                                    </div>
                                    <div className="flex items-center h-[1.2vw]">
      <span
          className="text-left text-[0.93vw] text-black whitespace-nowrap max-w-[15.26vw] overflow-hidden mr-[0.78vw] font-normal">
        {item.company}
      </span>
                                    </div>
                                    <div className={"mt-auto"}>
                                        <div className="flex items-center mt-[0.44vw]">
                                            <ImLocation size={17} className='d-inline mr-1'/>
                                            <span
                                                className="text-[0.83vw] text-gray-600 whitespace-nowrap overflow-hidden ">
        {item.location}
      </span>
                                        </div>
                                        <div className="flex items-center  ">
                                            <ImBriefcase size={17} className='d-inline mr-1'/>
                                            <span
                                                className="text-[0.83vw] text-gray-600 whitespace-nowrap overflow-hidden ">
        {item.type}
      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="embla__slide ">
                        <div
                            key={item.key}
                            className="bg-gray-200 hover:bg-gray-50 cursor-pointer w-full embla__slide__number__new p-6 grid grid-cols-12 grid-rows-9 gap-1 "
                        >
                            <img
                                src={item.logo}
                                className="col-start-1 col-span-3 row-start-1 row-span-3 rounded-[0.52vw] opacity-100 object-contain"
                                alt={`${item.company} Logo`}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                className="col-start-8 col-span-1 flex items-center justify-end  flex items-center justify-center fill-gray-600"
                            >
                                <path
                                    d="M4117,14a7,7,0,1,1,7-7A7.009,7.009,0,0,1,4117,14Zm-3.259-7.306a.565.565,0,1,0,0,1.13h3.518a.566.566,0,0,0,.566-.565V2.741a.564.564,0,1,0-1.129,0V6.694Z"
                                    transform="translate(-4110)"
                                ></path>
                            </svg>
                            <div
                                className="col-start-9 col-span-4 flex items-center justify-end">

                                {item.daysLeft} days left
                            </div>
                        </div>
                    </div>
                    {/*))}*/}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                </div>
            </div>


        </section>
    )
}

export default EmblaCarousel
