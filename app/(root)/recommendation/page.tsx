
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

const recom = [
  { key: 1, role: 'Assistant Operations Manager', type: 'On site', image: '/assets/BI.png', numSkills: '3', company: 'Brian Industies', jobType: 'Full time', location: 'Colombo, Western Province', daysLeft: '4 days left' },
  { key: 2, role: 'Assistant Operations Manager', type: 'On site', image: '/assets/BI.png', numSkills: '3', company: 'Brian Industies', jobType: 'Full time', location: 'Colombo, Western Province', daysLeft: '4 days left' },
  { key: 3, role: 'Assistant Operations Manager', type: 'On site', image: '/assets/BI.png', numSkills: '3', company: 'Brian Industies', jobType: 'Full time', location: 'Colombo, Western Province', daysLeft: '4 days left' },
  { key: 4, role: 'Assistant Operations Manager', type: 'On site', image: '/assets/BI.png', numSkills: '3', company: 'Brian Industies', jobType: 'Full time', location: 'Colombo, Western Province', daysLeft: '4 days left' },
]

function recommendation() {
  return (
    <div>

      <header className="home-header">
        <p className="mx-auto max-w-2xl text-xl font-bold tracking-tight text-primaryText sm:text-4xl mt-4">
          Job recommendations For You
        </p>
      </header>

      <form action="" className='mb-4'>
        <label className="mx-auto mt-4 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-1 px-1 rounded-2xl gap-1 shadow-xl focus-within:border-gray-300">
          <input
            id="search-bar"
            placeholder="I'm looking for...   (Eg : Job title, Position, Company)"
            name="q"
            className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white text-black"
          />
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
          >
            <div className="flex items-center transition-all opacity-1">
              <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                Search
              </span>
            </div>
          </button>
        </label>
      </form>

      {recom && recom.map((item) => (
        <div className='mb-4'>
          <Card className="cursor-pointer" isHoverable>
            <CardHeader className="grid grid-cols-12 gap-2 items-center justify-center">
              <div className='relative md:col-span-1 col-span-3'>

                <Image
                  alt="nextui logo"
                  height={90}
                  radius="sm"
                  src={item.image}
                  width={80}
                />
              </div>
              <div className='relative md:col-span-6 col-span-9'>
                <p className="text-md font-bold">{item.role} | {item.type}</p>
                <p className="text-small text-default-500 font-   semibold">{item.company}</p>
                <div className='inline-flex items-center mt-2 gap-2'>
                  <IoLocationOutline className='icon' />
                  <p className='font-mono '>{item.location}</p>
                </div>
              </div>
              <div className="relative md:col-span-2 col-span-12 md:col-end-13 md:col-start-11">
                <div className='flex items-center gap-2'>
                  <MdAccessTime />
                  <p>{item.daysLeft}</p>
                </div>
                <p className=''>{item.jobType}</p>
                <div className='bg-recruitBlue text-white rounded-md w-fit  pl-1 pr-1'>{item.numSkills} skills matched </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}



    </div>
  )
}

export default recommendation
