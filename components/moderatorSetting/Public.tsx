import {useEffect, useState} from "react";
import {Button, ButtonGroup} from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import React from "react";
import {uploadFile} from "@/lib/api";
import {Bounce, toast} from "react-toastify";
import {useModerator} from "@/lib/hooks/useModerators";
import {useSession} from "next-auth/react";
import LoadingComponent from "@/components/LoadingComponent";
import {toTitleCase} from "@/lib/utils";
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

interface profileData{
  id: string,
  email: string,
  role: string,
  isActive: boolean,
  createdAt: string,
  firstName: string,
  lastName: string,
  profilePic: string,
  city: string,
  gender: string,
  moderatorId:string,
  mobileNumber:string
}

export default function Public() {
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [mobileNumber, setMobileNumber] = useState<string>("")
  const [data,setData] = useState<profileData>();
  const [reload,setReload]=useState(false)

  const {data:session}=useSession();
  const axios=useAxiosAuth();

  useEffect(() => {
    getDetails()
    setReload(false)
  }, [reload]);

  function getDetails(){
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/moderator/${session?.user.roleDetails.moderatorId}`)
        .then(response =>{
          if(response.status === 200){
            setFirstName(response.data.content.firstName)
            setLastName(response.data.content.lastName)
            setMobileNumber(response.data.content.mobileNumber)
            setCity(response.data.content.city)
            setData(response.data.content)
          }
        })
        .catch(error => {
          console.error("Error fetching application data:", error);
          return [];
        });
  }

  function uploadImage(url:string){
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update-moderator`,{
      "profilePic":url
    })
        .then(response =>{
          if(response.status === 200){
            window.location.reload();
          }
        })
        .catch(error => {
          console.error("Error fetching application data:", error);
          return [];
        });
  }

  function updateData(){

    const data={
      "firstName":firstName,
      "lastName":lastName,
      "city":city,
      "mobileNumber":mobileNumber,
    }
    setIsLoading(true)
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update-moderator`,data)
        .then(response =>{
          if(response.status === 200){
            toast.success('Update successfully!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            })

            setTimeout(() => {
              window.location.reload();
            }, 3000)

          }else {
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

            })
          }
          setIsLoading(false)
        })
        .catch(error => {

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
          })
          console.error("Error fetching application data:", error);
          setIsLoading(false)
          return [];
        });
  }

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
      const profilePicUrl=response.data.content.path;

      if(profilePicUrl){
        console.log("profilePicUrl: ",profilePicUrl);
        uploadImage(profilePicUrl)
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
        setIsLoading(false)
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
      setIsLoading(false)
    }
    onClose()
  };

  if(isLoading){
    return <LoadingComponent />
  }

    return (
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8  sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profile Details</h2>
            <div className="grid mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                    className="object-contain w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={
                            data?.profilePic=="/profileImages/noImage.png"?
                                "/profileImages/noImage.png"
                                :data?.profilePic
                                ?process.env.NEXT_PUBLIC_S3_URL+data.profilePic
                                :"/profileImages/noImage.png"
                }
                    alt={toTitleCase(data?.firstName + ' ' + data?.lastName)}
                />
                <ButtonGroup className="ml-4">
                  <Button onPress={onOpen}>Edit Picture</Button>
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
                              <div
                                  className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
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
                            </ModalFooter>
                          </>
                      )}
                    </ModalContent>
                  </Modal>
                </ButtonGroup>
              </div>

              <div className="items-center mt-8 sm:mt-14 text-[#202142] ">
                <div className={"w-full flex gap-4 mb-4"}>
                  <Input
                      name={"firstName"}
                      isRequired
                      type="text"
                      label="First Name"
                      value={firstName}
                      onValueChange={setFirstName}
                      className="col-span-12 md:col-span-4  mb-2"
                  />
                  <Input
                      name={"lastName"}
                      isRequired
                      type="text"
                      label="Last Name"
                      value={lastName}
                      onValueChange={setLastName}
                      className="col-span-12 md:col-span-4  mb-2"
                  />
                </div>
                <div
                    className="grid grid-cols-12 gap-4 gap-y-4 items-center w-full mb-2 ">

                  <Input
                      isDisabled
                      disabled={true}
                      type="email"
                      label="Email"
                      value={data?.email}
                      className="col-span-12 md:col-span-4  mb-2"
                  />

                  <Input
                      name={"mobileNumber"}
                      isRequired
                      type="text"
                      label="Monbile Number"
                      value={mobileNumber}
                      onValueChange={setMobileNumber}
                      className="col-span-4 mb-2"
                  />

                  <Input
                      name={"city"}
                      isRequired
                      type="text"
                      label="City"
                      value={city}
                      onValueChange={setCity}
                      className="col-span-4 mb-2"
                  />


                </div>


                <div className="flex justify-end">
                  <button
                      onClick={updateData}
                      className="mt-4 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
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
