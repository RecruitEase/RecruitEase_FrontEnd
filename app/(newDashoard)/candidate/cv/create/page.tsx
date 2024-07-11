import HeaderBox from '@/components/dashboard/HeaderBox'
import React from 'react'

function Create() {
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Your Job Recommendations"
          subtext="Here are some jobs that we think you might be interested in."
        />
      </header>

    </div>
  )
}

export default Create
