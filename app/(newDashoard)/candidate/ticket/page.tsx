"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React, { Key } from 'react'
import { Card, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react"
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
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
];

const interviews = [
  "HR Interview",
  "Technical Interview",
  "Managerial Interview",
];

const applications = [
  "Resume Submission",
  "Cover Letter Submission",
  "Portfolio Submission",
];

const otherSupport = [
  "General Inquiry",
  "Feedback",
  "Complaint",
];

function Ticket() {

  const [type, setType] = useState('');
  const [itemList, setItemList] = useState<string[]>([]);

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
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Tickets And Support Requests"
          subtext="When users have issues, they can create a ticket or support request here."
        />
      </header>
      <Card className='w-full'>
        <div className='font-bold text-xl'>Create New Ticket</div>

        {/* select ticket types */}
        <Autocomplete
          label="Type"
          placeholder="Select ticket type"
          defaultSelectedKey=""
          defaultItems={ticketTypes}
          className="max-w-xs mb-1 pl-1 pr-1"
          scrollShadowProps={{
            isEnabled: false
          }}
          onSelectionChange={handleTicketTypeChange}
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>

        {type == 'Job_offer' && <Autocomplete
          label="Type"
          placeholder="Select ticket type"
          defaultSelectedKey=""
          defaultItems={ticketTypes}
          className="max-w-xs mb-1 pl-1 pr-1"
          scrollShadowProps={{
            isEnabled: false
          }}
          onSelectionChange={handleTicketTypeChange}
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>}
        {type == 'Interview' && "Interview"}
        {type == 'Application' && "Application"}
        {type == 'Other' && "Other"}
        {type == 'Support' && "Support"}
        <Input
          isRequired
          type="email"
          label="Email"
          defaultValue="junior@nextui.org"
          className="max-w-xs"
        />
      </Card>


    </div>
  )
}

export default Ticket
