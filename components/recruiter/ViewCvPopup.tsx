"use client";
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, } from "@nextui-org/react";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { ApplicationProps } from '@/types';
type viewCvPopupProps ={
    isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  applicant: ApplicationProps ;
}

function ViewCvPopup({ isOpen, onOpenChange ,applicant}:viewCvPopupProps) {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">View CV of {applicant.name}</ModalHeader>
          <ModalBody>
            {applicant.cv.file && 
            <div
            style={{
                height: '750px',
                border: '1px solid rgba(0, 0, 0, 0.3)',
            }}
        >
          <Worker workerUrl="/assets/pdf.worker.min.js">

        <Viewer 
        plugins={[defaultLayoutPluginInstance]}
        fileUrl={applicant.cv.file} />
      </Worker>  </div>}
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