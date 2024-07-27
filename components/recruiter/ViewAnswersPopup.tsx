"use client";
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, } from "@nextui-org/react";

import { ApplicationProps } from '@/types';
type viewCvPopupProps ={
    isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  applicant: ApplicationProps ;
}

function ViewAnswersPopup({ isOpen, onOpenChange ,applicant}:viewCvPopupProps) {


  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">View Answers of {applicant.name}</ModalHeader>
          <ModalBody>
        
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Single Choice Question</h2>
            <div className="mb-4 p-4 border rounded-md bg-green-100 border-green-300">Answer: A - Correct (Score: 5/5)</div>
            <div className="mb-4 p-4 border rounded-md bg-red-100 border-red-300">Answer: B - Incorrect (Score: 0/5)</div>
        </div>
        
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Multiple Choice Question</h2>
            <div className="mb-4 p-4 border rounded-md bg-green-100 border-green-300">Answer: A, C - Correct (Score: 10/10)</div>
            <div className="mb-4 p-4 border rounded-md bg-red-100 border-red-300">Answer: A, B, C - Incorrect (Score: 5/10)</div>
        </div>
        
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Open Question ( Not Graded )</h2>
            <div className="p-4 border rounded-md bg-gray-100 border-gray-300">Answer: The capital of France is Paris. (Score: 8/10)</div>
        </div>
        
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Score</h2>
            <div className="text-lg font-bold text-gray-800">23/25</div>
    </div>
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

export default ViewAnswersPopup