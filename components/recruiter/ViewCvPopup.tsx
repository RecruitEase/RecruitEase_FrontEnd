"use client";
import React, {useEffect} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, } from "@nextui-org/react";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import {ApplicationProps, CVProps} from '@/types';
import {useCv} from "@/lib/hooks/useCvs";
import {CandidateProp} from "@/types/users";
import {toTitleCase} from "@/lib/utils";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
type viewCvPopupProps ={
    isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  cvID: string ;
  candidate:CandidateProp;
}

function ViewCvPopup({ isOpen, onOpenChange ,cvID,candidate}:viewCvPopupProps) {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [isLoading, setIsLoading] = React.useState(true)
  const [cv, setCv] = React.useState<CVProps|null>(null)
  const [error, setError] = React.useState('')
  const [pdfData, setPdfData] = React.useState<string | null>(null);
  const axios = useAxiosAuth()

  useEffect(() => {
    const fetchCvAndPdf = async () => {
      try {
        setIsLoading(true)
        const res=await axios.get(`api/v1/cv/view/${cvID}`)
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
        setError('')
      } catch (error) {
        setError('Error fetching data!')
        console.error('Error fetching data:', error);
      }
      setIsLoading(false)
    };

    fetchCvAndPdf()

  }, [cvID,candidate]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">View CV of {toTitleCase(candidate.firstName+" "+candidate.lastName)}</ModalHeader>
          <ModalBody>
            {(isLoading)?<LoadingComponent /> :
                (error=='')?

                <div
                    style={{
                      height: '750px',
                      border: '1px solid rgba(0, 0, 0, 0.3)',
                    }}
                >
                  <Worker workerUrl="/assets/pdf.worker.min.js">
                    <Viewer fileUrl={`${pdfData}`}  />
                  </Worker>
                </div>
            :<ErrorComponent />
            }
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            {/* <Button color="primary" onPress={onClose}>
              Action
            </Button> */}
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  )
}

export default ViewCvPopup