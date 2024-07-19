'use client'
import Image from 'next/image'
import React from 'react'
import HeroAnimation from './HeroAnimation'
import {motion} from "framer-motion"
import { Button } from '@nextui-org/button'
import Link from 'next/link'

type Props={}

const Hero = ({}:Props) => {
    const wrapper = {
        hidden:{
            opacity:0
        },
        visible:{
            opacity:1,
            transition:{
                staggerChildren:0.25,
            }
        }
    }

    const list = {
        hidden:{opacity:0, x:-100},
        visible:{
            opacity:1,
            x:0,
            transition:{duration:0.5 , ease:[0.455, 0.03, 0.515, 0.955], delay:1}
        }
    }
    const container = {
        visible:{
            transition:{
                staggerChildren:0.025
            }
        }
    }
    return (
        <div className='w-full'>
            <div className='flex flex-col md:flex-row md:gap-x-6 lg:gap-x-0 xl:grid xl:grid-cols-2 mt-4'>
                <div className='shrink-0 md:w-1/2 lg:w-7/12 xl:w-auto'>
                    <motion.h1 initial='hidden' animate='visible' variants={container}
                               className='text-4xl lg:text-5xl mb-8 font-semibold'>
                        {/* <span className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block'>The best way to</span> */}
                        <HeroAnimation text='Shape your'
                                       className='text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-100 inline-block'/>
                        <HeroAnimation text='Career'
                                       className='text-transparent bg-clip-text bg-gradient-to-br from-recruitBlue to-recruitBlue inline-block'/>
                        <HeroAnimation text='with RecruitEase'
                                       className='text-transparent bg-clip-text bg-gradient-to-br from-black to-zinc-300 inline-block'/>
                        {/* <span className='text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-violet-600 inline-block'>do clustering</span>
                    <span className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block'>in TypeScript</span> */}
                    </motion.h1>
                    <motion.ul initial='hidden' animate='visible' variants={wrapper} className='text-primaryText space-y-2'>
                        <motion.li variants={list} className='flex gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="fill-current h-5 shrink-0 mt-0.5">
                                <path
                                    d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                            </svg>
                            <span>Apply for jobs with ease</span>
                        </motion.li>
                        <motion.li variants={list} className='flex gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="fill-current h-5 shrink-0 mt-0.5">
                                <path
                                    d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                            </svg>
                            <span>Receive personalized job recommendations</span>
                        </motion.li>
                        <motion.li variants={list} className='flex gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="fill-current h-5 shrink-0 mt-0.5">
                                <path
                                    d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                            </svg>
                            <span>Create and manage your CV and portfolio</span>
                        </motion.li>
                        <motion.li variants={list} className='flex gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="fill-current h-5 shrink-0 mt-0.5">
                                <path
                                    d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                            </svg>
                            <span>Participate in online interviews through the platform </span>
                        </motion.li>
                    </motion.ul>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, delay: 1.5}}
                                className='mt-10 flex flex-col items-center sm:flex-row gap-3'>
                            <Button color={"primary"} href={"/jobs"} as={Link}>
                                Get Started
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                     className="fill-current h-3.5 ">
                                    <path
                                        d="M429.8 273l17-17-17-17L276.2 85.4l-17-17-33.9 33.9 17 17L354.9 232 24 232 0 232l0 48 24 0 330.8 0L242.2 392.6l-17 17 33.9 33.9 17-17L429.8 273z"></path>
                                </svg>
                            </Button>

                    </motion.div>
                </div>

                <div className='hidden md:block pt-3 shrink grow overflow-hidden z-10'>
                    <motion.div initial={{opacity: 0, x: -300}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5, delay: 1.5}} className='relative'>
                        <Image
                            alt="Relaxing app background"
                            className="z-0 w-full h-full object-cover"
                            src="/assets/landing/hero.png"
                            width={500}
                            height={500}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
