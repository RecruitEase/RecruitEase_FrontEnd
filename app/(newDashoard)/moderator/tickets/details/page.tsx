
"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React from 'react'
import { Button, Autocomplete, AutocompleteItem, Card } from "@nextui-org/react"

const status = [
  { label: "Under Review", value: "underReview" },
  { label: "Resolved", value: "resolved" },
  { label: "Rejected", value: "rejected" },
]

const ticketData = [
  {
    id: 1,
    delay: "1h ago",
    ticketId: "#11212121",
    subject: "Payment Issue",
    type: "Job Offer",
    date: "2024/12/12",
    status: "UnderReview",
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    description: "A ticket related to a payment issue for a job offer. The issue is currently under review and needs resolution."
  }
]

const candidateData = [
  {
    id: 1,
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  }
]

const recruiterData = [
  {
    id: 1,
    name: "Brian Industries",
    avatar: "/assets/BI.png",
  }
]
function TicketDetails() {
  return (
    <>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Ticket Details"
          subtext="User can see the details of the ticket here."
        />
      </header>

      <div className='grid grid-cols-12 gap-4'>

        <div className='col-span-12 md:col-span-7'>
          <Card className='mb-4'>
            <div className='grid grid-cols-12 m-2'>
              <div className=" col-span-9 font-bold">Subject : {ticketData[0].subject}</div>
              <div className=' col-span-3 bg-danger rounded-md w-fit ml-auto pl-2 pr-2 text-white '>{ticketData[0].delay}</div>
            </div>
            <div className="flex mb-2 ml-2 w-full">
              <p className="font-semibold">Ticket Type : </p>
              <p>{ticketData[0].type}</p>
              {ticketData[0].jobTitle && <div><p className="font-semibold">Job Title : </p>{ticketData[0].jobTitle}</div>}
            </div>
            <div className="flex mb-2 ml-2 w-full">
              <p className="font-semibold">Ticket Id : </p>
              <p>{ticketData[0].id}</p>
            </div>
            <div><p className=" font-semibold ml-2">Description:</p></div>
            <div className='ml-2 mb-2'>{ticketData[0].description}</div>
          </Card>

          <Autocomplete
            defaultItems={status}
            labelPlacement="outside"
            label="Change Ticket  Status"
            className="mb-4 w-52"
          >
            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
          </Autocomplete>

        </div >

        <div className='col-span-12 md:col-span-5'>
          <Card className='mb-2'>
            <div className='m-2'>
              <div className='font-bold'>About Complainant</div>
              <div className=' font-semibold mb-2'>{candidateData[0].name}</div>
              <div className='flex gap-2'>
                <div>
                  <img className="w-32 h-32 rounded-md mb-2" src={candidateData[0].avatar} alt="candidate picture" />
                </div>
                <div>
                  <div >
                    <Button className='bg-recruitBlue text-white  mb-2 mr-2' size='sm'>Chat</Button>
                  </div>
                  <div>
                    <Button className='bg-recruitBlue text-white  mb-2' size='sm'>View Profile</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className='m-2'>
              <div className=' font-semibold mb-2'>{recruiterData[0].name}</div>
              <div className='flex gap-2'>
                <div>
                  <img className="w-32 h-32 rounded-md mb-2" src={recruiterData[0].avatar} alt="candidate picture" />
                </div>
                <div>
                  <div >
                    <Button className='bg-recruitBlue text-white  mb-2 mr-2' size='sm'>Chat</Button>
                  </div>
                  <div>
                    <Button className='bg-recruitBlue text-white  mb-2' size='sm'>View Profile</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>


    </>
  )
}

export default TicketDetails
