"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React, { Key } from 'react'
import { Card, Input, Autocomplete, AutocompleteItem, Button, Textarea } from "@nextui-org/react"
import { useState } from 'react';
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ticketTypes = [
  { label: 'Job offer', value: 'Job_offer' },
  { label: 'Interview', value: 'Interview' },
  { label: 'Application', value: 'Application' },
  { label: 'Other', value: 'Other' },
  { label: 'Support', value: 'Support' },
]

// 2. Define job lists
const jobOffers = [
  { label: "Software Engineer", value: "Software Engineer" },
  { label: "Data Scientist", value: "Data Scientist" },
  { label: "Product Manager", value: "Product Manager" },
  { label: "UX Designer", value: "UX Designer" },
  { label: "QA Engineer", value: "QA Engineer" },
];

const interviews = [
  { label: "Software Engineer", value: "Software Engineer" },
  { label: "Data Scientist", value: "Data Scientist" },
  { label: "Product Manager", value: "Product Manager" },
  { label: "UX Designer", value: "UX Designer" },
  { label: "QA Engineer", value: "QA Engineer" },
];

function Ticket() {

  const [type, setType] = useState('');
  const router = useRouter()


  const handleTicketTypeChange = (key: Key | null) => {
    console.log('Selected ticket type:');
    let value = key?.toString();
    if (value) {
      console.log(value);
      setType(value);
    }
  };

  return (
    <div>
      <header className="home-header mb-4">
        <HeaderBox
          type="title"
          title="Tickets And Support Requests"
          subtext="When users have issues, they can create a ticket or support request here."
        />
      </header>
      <div>

        {/* select ticket types */}
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 md:col-span-4'>
            <Autocomplete
              isRequired
              variant="bordered"
              labelPlacement="outside"
              label="Type"
              placeholder="Select ticket type"
              defaultSelectedKey=""
              defaultItems={ticketTypes}
              className=""
              scrollShadowProps={{
                isEnabled: false
              }}
              onSelectionChange={handleTicketTypeChange}
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
          </div>

          <div className=' col-span-12 md:col-span-4'>
            {type == 'Job_offer' &&
              <Autocomplete
                isRequired
                variant="bordered"
                labelPlacement="outside"
                label="Job Title"
                placeholder="Select job title"
                defaultSelectedKey=""
                defaultItems={jobOffers}
                className=" "
                scrollShadowProps={{
                  isEnabled: false
                }}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>}

            {type == 'Interview' &&
              <Autocomplete
                isRequired
                variant="bordered"
                labelPlacement="outside"
                label="Job Type"
                placeholder="Select job title"
                defaultSelectedKey=""
                defaultItems={interviews}
                className=""
                scrollShadowProps={{
                  isEnabled: false
                }}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>}

            {type == 'Application' &&
              <Autocomplete
                isRequired
                variant="bordered"
                labelPlacement="outside"
                label="Job Title"
                placeholder="Select job title"
                defaultSelectedKey=""
                defaultItems={jobOffers}
                className=""
                scrollShadowProps={{
                  isEnabled: false
                }}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>}
          </div>

          <div className='col-span-12 md:col-span-8'>
            <Input
              isRequired
              variant="bordered"
              labelPlacement="outside"
              type="text"
              label="Subject"
              placeholder="Enter ticket subject"
              className=""
            />
          </div>

          <div className='col-span-12 md:col-span-8'>
            <Textarea
              isRequired
              variant="bordered"
              labelPlacement="outside"
              label="Description"
              placeholder="Enter your description"
              className=""
            />
          </div>

          <div className='col-span-12 md:col-span-8'>
            <Button className='bg-recruitBlue text-white w-fit' onClick={() => {
              toast.success('Ticket submitted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              });
              router.push('/candidate/tickets');
            }}>
              Submit Ticket</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
