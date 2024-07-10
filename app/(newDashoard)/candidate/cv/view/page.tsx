import HeaderBox from '@/components/dashboard/HeaderBox'
import React from 'react'
import { Button } from '@nextui-org/react'

function View() {
  const cv = {
    cvId: 1,
    cvName: 'CV1',
    file: '/assets/cv.pdf',
    modifiedDate: '2021-09-01',
    type: 'template'
  }
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title={cv.cvName}
          subtext="View and edit your CV here."
        />
      </header>
      <div className='w-full text-right mb-2'>
        <p className='font-thin'>Last modified Date: {cv.modifiedDate}</p>
      </div>
      <div className=' flex justify-end  gap-2'>
        <Button isDisabled={cv.type !== "template"} className='bg-recruitBlue text-white'>
          Edit
        </Button>
        <Button className='bg-danger text-white'>
          Delete
        </Button>


      </div>



    </div>
  )
}

export default View
