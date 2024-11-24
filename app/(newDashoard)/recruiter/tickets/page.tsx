import React from 'react'
import HeaderBox from '@/components/dashboard/HeaderBox'
import TicketTableForRecruiter from "@/components/ticket/TicketTableForRecruiter";

function AllTickets() {
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="All Tickets"
          subtext="Users can see all the tickets and create tickets here."
        />
      </header>
      <TicketTableForRecruiter />
    </div>
  )
}

export default AllTickets
