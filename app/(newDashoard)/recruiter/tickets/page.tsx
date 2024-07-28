import React from 'react'
import TicketTable from '@/components/ticket/TicketTable'
import HeaderBox from '@/components/dashboard/HeaderBox'

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
      <TicketTable />
    </div>
  )
}

export default AllTickets
