"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React, { Key } from 'react'
import { Card, Input, Autocomplete, AutocompleteItem, Button, Textarea } from "@nextui-org/react"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import {TicketCreationProps, typeOptions} from "@/types/tickets";
import {useCreateTicket} from "@/lib/hooks/useTickets";


function Ticket() {
  const router = useRouter()
  const createQuery=useCreateTicket();
  const handleSubmit=()=>{
    const ticketDetails:TicketCreationProps = {
      type:type,
      subject,
      description
    }

    createQuery.mutate({request:ticketDetails,role:"recruiter"})
    if(createQuery.isSuccess)
      router.push('/recruiter/tickets');

  }

  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');




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
                  defaultItems={typeOptions}
                  className=""
                  selectedKey={type}
                  scrollShadowProps={{
                    isEnabled: false
                  }}
                  onSelectionChange={(key)=>setType(key!.toString())}
              >
                {(item) => <AutocompleteItem key={item.uid}>{item.name}</AutocompleteItem>}
              </Autocomplete>
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
                  onValueChange={setSubject}
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
                  onValueChange={setDescription}
              />
            </div>

            <div className='col-span-12 md:col-span-8'>
              <Button className='bg-recruitBlue text-white w-fit' onClick={handleSubmit}>
                Submit Ticket</Button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Ticket
