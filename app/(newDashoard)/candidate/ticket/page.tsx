"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React, { Key } from 'react'
import { Card, Input, Autocomplete, AutocompleteItem, Button, Textarea } from "@nextui-org/react"
import { useState } from 'react';

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
  { label: "Phone Interview", value: "Phone Interview" },
  { label: "Onsite Interview", value: "Onsite Interview" },
  { label: "Technical Interview", value: "Technical Interview" },
  { label: "Behavioral Interview", value: "Behavioral Interview" },
  { label: "Panel Interview", value: "Panel Interview" },
];

const applications = [
  { label: "Application Status", value: "Application Status" },
  { label: "Application Process", value: "Application Process" },
  { label: "Application Materials", value: "Application Materials" },
  { label: "Application Deadline", value: "Application Deadline" },
  { label: "Application Withdrawal", value: "Application Withdrawal" },
];

const otherSupport = [
  { label: "General Inquiry", value: "General Inquiry" },
  { label: "Technical Issue", value: "Technical Issue" },
  { label: "Billing Issue", value: "Billing Issue" },
  { label: "Feedback", value: "Feedback" },
  { label: "Complaint", value: "Complaint" },
];

function Ticket() {

  const [type, setType] = useState('');

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
                label="Interview Type"
                placeholder="Select interview type"
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
                label="Application Type"
                placeholder="Select application type"
                defaultSelectedKey=""
                defaultItems={applications}
                className=""
                scrollShadowProps={{
                  isEnabled: false
                }}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>}

            {type == 'Support' &&
              <Autocomplete
                isRequired
                variant="bordered"
                labelPlacement="outside"
                label="Type"
                placeholder="Select ticket type"
                defaultSelectedKey=""
                defaultItems={otherSupport}
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
            <Button className='bg-recruitBlue text-white w-fit'>Submit Ticket</Button>
          </div>

        </div>




      </div>
    </div>
  )
}

export default Ticket
