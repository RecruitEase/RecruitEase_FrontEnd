import React from 'react'
import MTicketTable from '@/components/ticket/MTicketTable'
import HeaderBox from '@/components/dashboard/HeaderBox'

function AllTickets() {
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Manage Tickets"
          subtext="User can see all the tickets here."
        />
      </header>
      <MTicketTable />
    </div>
  )
}

export default AllTickets
