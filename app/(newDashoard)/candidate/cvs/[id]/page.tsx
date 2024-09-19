"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React, { use, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useParams } from 'next/navigation';
import LoadingComponent from '@/components/LoadingComponent';
import { CVProps } from '@/types';
import { headers } from 'next/headers';
import { useSession } from 'next-auth/react';

function View() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [cv, setCv] = React.useState<CVProps|null>(null)
  const [pdfData, setPdfData] = React.useState<string | null>(null);
    const {data:session}=useSession();
    // const cv = {
  //   cvId: 1,
  //   cvName: 'CV1',
  //   file: '/assets/cv.pdf',
  //   modifiedDate: '2021-09-01',
  //   type: 'uploaded'
  // }
  const params = useParams<{id:string}>()
  const axios = useAxiosAuth()
  
  useEffect( () => {
    const fetchCvAndPdf = async () => {
      try {
  
        const res=await axios.get(`api/v1/cv/view/${params.id}`)
          console.log(res.data)
          setCv(res.data.content)
        // Fetch PDF file
        const pdfResponse = await axios.get(`api/v1/files/view/${res.data.content.file}`,{responseType: 'blob'});
        console.log("ppppppppp",pdfResponse)
        // Convert arraybuffer to base64
        const pdfBlob = new Blob([pdfResponse.data], { type: 'application/pdf' });
         const reader = new FileReader();
         reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setPdfData(reader.result);
          }
        };
        reader.readAsDataURL(pdfBlob);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false)
    };

    
      fetchCvAndPdf()
    }, [])
  



  return (
    <div>
      {isLoading? <LoadingComponent /> :
      <>
      <header className="home-header">
        <HeaderBox
          type="title"
          title={"View CV : "+cv!.cvName}
          subtext="View and edit your CV here."
        />
      </header>
        <div className='w-full text-right mb-2'>
          <p className='font-thin m-2'>Created Date: {cv!.createdAt}</p>
        </div>
        <div className=' flex justify-end m-2 gap-2'>


          <Button className='bg-danger text-white'>
            Delete
          </Button>
        </div>
        


        <Worker workerUrl="/assets/pdf.worker.min.js">
          <Viewer fileUrl={`${pdfData}`}  />
        </Worker>
      </>
      }

    </div>
  )
}

export default View
