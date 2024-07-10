"use client"
import React from 'react';
import { Card, CardHeader, Image, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


const Management = () => {

  const cvs = [
    { key: 1, name: 'CV1', image: '/assets/cv.png' },
    { key: 2, name: 'CV2', image: '/assets/cv.png' },
    { key: 3, name: 'CV3', image: '/assets/cv.png' },
    { key: 4, name: 'CV4', image: '/assets/cv.png' },
    { key: 5, name: 'CV5', image: '/assets/cv.png' },

  ]

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>

      <div className=' w-full'>
        <div className=' w-full flex justify-end gap-2'>
          <Button className='bg-recruitBlue text-white'>
            Create
          </Button>

          {/* upload CV button */}
          <Button onPress={onOpen} className='bg-recruitBlue text-white'>Upload</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Upload Your CV</ModalHeader>
                  <ModalBody>
                    <div>
                      <div>


                      </div>
                      <div className='border border-dashed border-gray-500 p-4 mb-4 w-1/2'>
                        <div className='items-center justify-center font-extralight text-xs'>
                          Drag and drop
                          your CV here</div>
                      </div>
                    </div>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
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
            <div id={"cv" + item.key}>
              <Card className="col-span-12 sm:col-span-4 h-[350px] w-[200px] m-2 mt-2">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-fit"
                  src={item.image}
                />
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
