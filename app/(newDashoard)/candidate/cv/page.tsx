"use client"
import React from 'react';
import { Card, CardHeader, Image, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import CustomInputWithoutValidation from '@/components/form_inputs/CustomInputWithoutValidations';
import Link from 'next/link';


const Management = () => {

  const cvs = [
    { key: 1, name: 'CV1', image: '/assets/cv.png' },
    { key: 2, name: 'CV2', image: '/assets/cv.png' },
    { key: 3, name: 'CV3', image: '/assets/cv.png' },
    { key: 4, name: 'CV4', image: '/assets/cv.png' },
    { key: 5, name: 'CV5', image: '/assets/cv.png' },

  ]

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>

      <div className=' w-full'>
        <div className=' w-full flex justify-end gap-2'>
          <Button className='bg-recruitBlue text-white' as={Link} href={"/candidate/cv/create"}>
            Create
          </Button>

          {/* upload CV button */}
          <Button onClick={onOpen} className='bg-recruitBlue text-white'>Upload</Button>
          <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Upload Your CV</ModalHeader>
                  <ModalBody>
                    <div>
                      <div>
                        <CustomInputWithoutValidation
                          name='name'
                          label='CV Name'
                          required={true}
                          placeholder='CV Name'
                          className='mb-5' />
                      </div>
                      <div className='border border-dashed border-gray-500 p-4 mb-4 h-40'>
                        <div className='items-center justify-center font-extralight text-xs'>
                          Drag and drop
                          your CV here</div>
                      </div>
                    </div>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onClick={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

        </div>
        <div className='flex flex-col sm:flex-row  w-full flex-wrap place-content-between'>
          {cvs && cvs.map((item) => (
            <div id={"cv" + item.key} className=' relative group'>
              <Card className="col-span-12 sm:col-span-4 h-[350px] w-[200px] m-2 mt-2 transition duration-300 ease-in-out">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover duration-300 ease-in-out group-hover:blur-sm"
                  src={item.image}
                />
                <CardHeader className="absolute z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
                  {/* Added hover effect for the button */}
                  <Button className=' bg-recruitBlue' as={Link} href="/candidate/cv/view">
                    View CV
                  </Button>
                </CardHeader>
              </Card>
              <div className=' text-center font-bold'> {item.name}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Management;
