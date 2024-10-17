import {useState} from "react";
import {Button, ButtonGroup} from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import React from "react";
import {uploadFile} from "@/lib/api";
import {Bounce, toast} from "react-toastify";

export default function Public() {
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setIsLoading(true)
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setSelectedFile(file);
      uploadFileNow(file);
    } else {
      alert('Only jpeg, jpg, and png files are allowed.');
    }
  };

  const uploadFileNow = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', "public/profilePics/");

    try {
      const response = await uploadFile(formData)
      console.log(response.data);
      const profilePicUrl=response.data.content.publicLink;

      if(profilePicUrl){
        console.log("profilePicUrl: ",profilePicUrl);

        //todo: send to update profile


        toast.success('Updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }else{
        toast.error('Error Occurred!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error('Error Occurred!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    onClose()
    setIsLoading(false)


  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Bordered avatar"
            />
            <ButtonGroup className="ml-4">
              <Button  onPress={onOpen}>Edit Picture</Button>
              <Modal
                  backdrop="opaque"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                  }}
              >
                <ModalContent>
                  {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Upload file</ModalHeader>
                        <ModalBody>
                          <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                               >
                            <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                            <div className="input_field flex flex-col w-max mx-auto text-center">
                              {!isLoading && <label>
                                <input
                                    className="text-sm cursor-pointer w-36 hidden"
                                    type="file"
                                    accept="image/jpeg, image/jpg, image/png"
                                    onChange={handleFileChange}
                                />
                                <div
                                    className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500"
                                >
                                  Select
                                </div>


                              </label>
                              }
                              {isLoading && <div className={"flex gap-5"}>Uploading
                                <div className="flex flex-row gap-2">
                                  <div
                                      className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                                  <div
                                      className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                                  <div
                                      className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                                </div>
                              </div>}
                              {/*<div className="title text-indigo-500 uppercase">or drop files here</div>*/}
                            </div>
                          </div>

                        </ModalBody>
                        <ModalFooter>
                        <Button hidden={isLoading} color="danger" variant="light" onPress={onClose}>
                            Close
                          </Button>
                          {/*<Button color="primary" onPress={onClose}>*/}
                          {/*  Action*/}
                          {/*</Button>*/}
                        </ModalFooter>
                      </>
                  )}
                </ModalContent>
              </Modal>
            </ButtonGroup>
          </div>

          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <div
                className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <Input
                    isRequired
                    type="text"
                    label="Name"
                    defaultValue="Sajith Bandara"
                    className="max-w-xs"
                />
              </div>
              <div className="w-full">
                <Input
                    isRequired
                    type="email"
                    label="Email"
                    defaultValue="sajithbandara@gamil.com"
                    className="max-w-xs"
                />
              </div>
            </div>
            <div className="mb-2 sm:mb-6">
              <Textarea
                isRequired
                label="Address"
                labelPlacement="outside"
                defaultValue="No 123, Colombo, Sri Lanka"
                className="w-full"
              />
            </div>
            <div className="mb-2 sm:mb-6">
              <Textarea
                isRequired
                label="About Me"
                labelPlacement="outside"
                defaultValue="I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and code development. I'm always striving to grow and learn something new, trying to do stuff that is outside my comfort zone. My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin, and Editor X."
                className="w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
