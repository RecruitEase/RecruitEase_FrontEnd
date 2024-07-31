"use client"
import React from 'react'
import { Card, CardHeader, Image, Autocomplete, AutocompleteItem, Checkbox, Chip } from "@nextui-org/react";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import {jobs} from '@/constants/jobData'

const job=jobs;

const industries = [
  { label: "Agriculture, Forestry & Fishing", value: "agriculture" },
  { label: "Mining & Quarrying", value: "mining" },
  { label: "Utilities", value: "utilities" },
  { label: "Construction", value: "construction" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Wholesale & Retail Trade", value: "wholesale_retail" },
  { label: "Transportation & Warehousing", value: "transportation" },
  { label: "Accommodation & Food Service", value: "accommodation_food" },
  { label: "Information & Communication", value: "information_communication" },
  { label: "Finance & Insurance", value: "finance_insurance" },
  { label: "Real Estate", value: "real_estate" },
  { label: "Professional, Scientific & Technical Activities", value: "professional_scientific" },
  { label: "Administrative & Support Services", value: "administrative_support" },
  { label: "Education", value: "education" },
  { label: "Healthcare & Social Assistance", value: "healthcare_social" },
  { label: "Arts, Entertainment & Recreation", value: "arts_entertainment" },
  { label: "Other Services", value: "other_services" },
];

const jobTypes = [
  { label: "Full time", value: "full_time" },
  { label: "Part time", value: "part_time" },
  { label: "Contract", value: "contract" },
  { label: "Temporary", value: "temporary" },
  { label: "Internship", value: "internship" },
];

const jobLevels = [
  { label: "Entry Level", value: "entry_level" },
  { label: "Mid Level", value: "mid_level" },
  { label: "Senior Level", value: "senior_level" },
  { label: "Executive", value: "executive" },
];

const postedTimes = [
  { label: "Last 24 hours", value: "last_24_hours" },
  { label: "Last 7 days", value: "last_7_days" },
  { label: "Last 30 days", value: "last_30_days" },
];

const sort = [
  { label: "Recent", value: "recent" },
  { label: "Popular", value: "popular" },
  { label: "Most Applied", value: "most_applied" },
];


function Recommendation() {
  return (
    <div >

      <header className="home-header">
        <p className="mx-auto max-w-2xl text-xl font-bold tracking-tight text-primaryText sm:text-4xl mt-4">
          Job recommendations for you
        </p>
      </header>

      <form action="" className='mb-4'>
        <label className="mx-auto mt-4 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-1 px-1 rounded-2xl gap-1 shadow-md focus-within:border-gray-300">
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

      <div className='mb-4 w-auto ml'>
        <Card className="cursor-pointer" isHoverable>
          <div className='flex md:flex-row flex-col p-4'>
            <div className='md:m-2 mx-auto'>
              <p className='font-semibold'>5 Recommendations Found</p>
            </div>
            <div className='md:mr-2 mt-1 mx-auto'>
              <div className='flex items-center gap-1 '>
                <CiFilter />
                <Autocomplete
                  defaultItems={sort}
                  labelPlacement="inside"
                  label=""
                  placeholder='Recent'
                  className="max-w-36 shadow-none"
                >
                  {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                </Autocomplete>
              </div>
            </div>

          </div>


        </Card>
      </div>
      {/* Filter */}
      <div className='grid grid-col-1 md:grid-cols-4 gap-2'>
        <div className='w-fit mx-auto md:grid col-span-1 md:col-span-1'>
          <Card className="p-3 flex flex-col gap-2 col-span-12 sm:col-span-4 h-[400px]">
            <Autocomplete
              label="Industry"
              placeholder="Select industry"
              defaultSelectedKey="Construction"
              defaultItems={industries}
              className="max-w-xs mb-1 pl-1 pr-1 pt-1"
              scrollShadowProps={{
                isEnabled: false
              }}
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>

            <Autocomplete
              label="Job Type"
              placeholder="Select job type"
              defaultSelectedKey="Full time"
              defaultItems={jobTypes}
              className="max-w-xs mb-1 pl-1 pr-1"
              scrollShadowProps={{
                isEnabled: false
              }}
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>

            <Autocomplete
              label="Job Level"
              placeholder="Select job level"
              defaultSelectedKey="Entry Level"
              defaultItems={jobLevels}
              className="max-w-xs mb-1 pl-1 pr-1"
              scrollShadowProps={{
                isEnabled: false
              }}
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>

            <Autocomplete
              label="Posted"
              placeholder="Select posted time"
              defaultSelectedKey="Resently posted"
              defaultItems={postedTimes}
              className="max-w-xs mb-2 pl-1 pr-1"
              scrollShadowProps={{
                isEnabled: false
              }}
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>

            <div className='pl-1'>
              <Checkbox >Remote/Work from home</Checkbox>
            </div>

          </Card>
        </div>
        {/* job recommendations */}
        <div className='col-span-1 md:col-span-3'>
          {job && job.map((item) => (
            <div className='mb-4' key={item.id} onClick={()=>{
              router.push(`/jobs/${item.id}`);
            }}>
              <Card className="cursor-pointer" isHoverable >
                <CardHeader className="grid grid-cols-12 gap-2 items-center justify-center">
                  <div className='relative md:col-span-1 col-span-3'>
                    <Image
                      alt=""
                      height={65}
                      radius="sm"
                      src={item.logo}
                      width={65}
                    />
                  </div>
                  <div className='relative sm:col-span-6 col-span-9'>
                    <p className="text-md font-bold">{item.title} | {item.type}</p>
                    <p className="text-small text-default-500 font-   semibold">{item.company}</p>
                    <div className='inline-flex items-center mt-2 gap-2'>
                      <IoLocationOutline className='icon' />
                      <p className='font-mono '>{item.location}</p>
                    </div>
                  </div>
                  <div className="relative sm:col-span-2 col-span-12 sm:col-end-13 sm:col-start-11">

                    {item.type === 'Full time' && <Chip color="warning" variant="flat">{item.type}</Chip>}
                    {item.type === 'Part time' && <Chip color="success" variant="flat">{item.type}</Chip>}
                    <div className='flex items-center gap-2'>
                      <MdAccessTime />
                      <p>{item.daysLeft}</p>
                    </div>
                    {/* <div className='bg-recruitBlue text-white rounded-md w-fit  pl-1 pr-1'>{item.numSkills} skills matched </div> */}
                    <Chip color="primary" variant="flat">{item.numSkills} skills matched</Chip>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Recommendation
