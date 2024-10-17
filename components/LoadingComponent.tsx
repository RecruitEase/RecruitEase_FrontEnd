"use client";
import { useEffect } from 'react'
import Image from 'next/image';

const LoadingComponent = () => {
    useEffect(() => {
        async function getLoader() {
            const { bouncy } = await import('ldrs')
            bouncy.register()
        }
        getLoader()
    }, [])

return (
      <div className="flex justify-center items-center w-full h-full m-10">
        <div className="flex flex-col items-center justify-center">

<l-bouncy
  size="45"
  speed="1.75" 
  color="black" 
/>
<Image className={"w-[50px]"}
              src="/logos/logoIconBlackSVG.svg"
              alt="RecruitEase"
              width={281}
              height={281}
          />

          <p className="mt-4 text-lg text-gray-700">Loading....</p>
        </div>
      </div>
    );
  };

export default LoadingComponent




