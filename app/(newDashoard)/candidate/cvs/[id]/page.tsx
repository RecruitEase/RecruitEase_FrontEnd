"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React from 'react'
import { Button } from '@nextui-org/react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function View() {
  const cv = {
    cvId: 1,
    cvName: 'CV1',
    file: '/assets/cv.pdf',
    modifiedDate: '2021-09-01',
    type: 'uploaded'
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
        <p className='font-thin m-2'>Last modified Date: {cv.modifiedDate}</p>
      </div>
      <div className=' flex justify-end m-2 gap-2'>
        <Button isDisabled={cv.type != "template"} className='bg-recruitBlue text-white'>
          Edit
        </Button>

        <Button className='bg-danger text-white'>
          Delete
        </Button>
      </div>


      <Worker workerUrl="/assets/pdf.worker.min.js">
        <Viewer fileUrl={cv.file} />
      </Worker>



    </div>
  )
}

export default View
