"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React, {useEffect, useState} from 'react'
import { Button, Autocomplete, AutocompleteItem, Card, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, Divider, Chip, divider,Image } from "@nextui-org/react"
import CustomTextWithoutValidations from "@/components/form_inputs/CustomTextAreaWithoutValidations"
import { Bounce, toast } from "react-toastify";
import Link from "next/link";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useParams } from 'next/navigation';
import {ParsedUrlQuery} from "node:querystring";
import LoadingComponent from "@/components/LoadingComponent";
import {router} from "next/client";

const status = [
  { label: "Under Review", value: "underReview" },
  { label: "Resolved", value: "resolved" },
  { label: "Rejected", value: "rejected" },
]
const recruiterData = [
  {
    id: 1,
    name: "Brian Industries",
    avatar: "/assets/BI.png",
  }
]

interface Ticket {
  type:string ,
  ticketId:string ,
  status:string ,
  subject:string,
  description:string ,
  creatorId:string ,
  creatorRole:string ,
  note: string,
  createdAt:string ,
  modifiedAt:string
}

const TicketDetails=()=> {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonClicked, setButtonClicked] = useState("");
  const [currentStatus, setCurrentStatus] = useState("UnderReview")
  const [ticket,setTicket]=useState<Ticket>()
  const [name,setName]=useState("")
  const [avatar,setAvatar]=useState("")
  const [lording, setLording]=useState(false)
    const [resolvedNote,setResolvedNote]=useState("")
    const [rejectNote,setRejectNote]=useState("")
    const[reload,setReload]=useState(false)

  const axios=useAxiosAuth();

  const params = useParams();
  const  ticketId = params.id;

  function getTicket(ticketId: string | string[]){
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticket/view/${ticketId}`)
        .then(response => {
          response.data.content
          setTicket(response.data.content)
          getUserDate(response.data.content.creatorId,response.data.content.creatorRole)
          handleCurrentStatus(response.data.content.status)
          setLording(false)
        })
        .catch(error => {
          console.error(`Error fetching company details`, error);
          return null;
        });
  }

  function getUserDate(userId:string,role:string){
    const url = role === "RECRUITER"
        ? `${process.env.NEXT_PUBLIC_API_URL}/user/recruiter/${userId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/user/candidate/${userId}`;

    console.log("url "+url)
    axios.get(url)
        .then(response => {
          response.data.content
          console.log("user:"+response.data.content)
          setName(response.data.content.firstName + " "+ response.data.content.lastName)
          {response.data.content.profilePic !=""?setAvatar(process.env.NEXT_PUBLIC_S3_URL+response.data.content.profilePic):setAvatar("/profileImages/noImage.png")}
        })
        .catch(error => {
          console.error(`Error fetching company details`, error);
          return null;
        });
  }

   function updateStatus(ticketId: string | string[], status: string, note: string) {
      const data={
          "status":status,
          "note":note
      }
      const response =  axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticket/update/${ticketId}`,data)
          .then(response => {
              if (response.status == 200) {
                  setReload(true)
                  toast.success(`Ticket ${status}!`, {
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

              } else {
                  toast.error('Failed!', {
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
          })
          .catch(error => {
              console.error(`Error fetching company details`, error);
              return null;
          });
  }

  useEffect(() => {
    setLording(true)
    getTicket(ticketId)
      setReload(false)
  }, [reload]);

    const handleResoledNote = (value:any) => {
        setResolvedNote(value);
    };
    const handleRejectedNote = (value: any) => {
        setRejectNote(value);
    };

  const handleButtonClicked = (button: string) => {
    setButtonClicked(button);
    onOpen();
  }

  const handleCurrentStatus = (status: string) => {
    setCurrentStatus(status);
  }

  return (
    <>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Ticket Details"
          subtext="View and manage ticket details"
        />
      </header>

      {lording?(
          <LoadingComponent/>
      ): (
          <div>
            <div className='grid grid-cols-12 '>

              <div className='col-span-12 md:col-span-7'>
                <div className='mb-4'>
                  <div className=" font-bold text-xl mb-4">{ticket?.subject}</div>
                  {currentStatus === "UNDER_REVIEW" &&
                      <Chip className="capitalize min-w-24 text-center mb-2 ml-auto" color="warning" size="sm"
                            variant="flat">
                        UnderReview
                      </Chip>}
                  {currentStatus === "RESOLVED" &&
                      <Chip className="capitalize min-w-24 text-center mb-2 ml-auto" color="success" size="sm"
                            variant="flat">
                        Resolved
                      </Chip>}
                  {currentStatus === "REJECTED" &&
                      <Chip className="capitalize min-w-24 text-center mb-2 ml-auto" color="danger" size="sm"
                            variant="flat">
                        Rejected
                      </Chip>}
                  <div className="flex">
                    <p className="text-sm">{ticket?.modifiedAt}</p>
                  </div>
                  <div className="flex">
                    <p className="text-sm">Id : </p>
                    <p className="text-sm pl-2">{ticket?.ticketId}</p>
                  </div>
                  <div className="flex">
                    <p className="text-sm">Type : </p>
                    <p className='text-sm pl-2'>{ticket?.type}</p>
                  </div>
                  {/*<div >*/}
                  {/*  {ticket. &&*/}
                  {/*    <div className="flex mb-2">*/}
                  {/*      <p className="text-sm">Job Title : </p>*/}
                  {/*      <p className="text-sm pl-2">{ticketData[0].jobTitle}</p>*/}
                  {/*    </div>}*/}
                  {/*</div>*/}
                  <div><p className="">Description :</p></div>
                  <div className='mb-2'>{ticket?.description}</div>
                </div>

                {(currentStatus === "UNDER_REVIEW") ? <div>
                  <Button className='bg-success text-white  mb-2 mr-2' size='sm' onClick={() => {
                    handleButtonClicked("RESOLVED")
                  }}>Resolve</Button>
                  <Button className='bg-danger text-white  mb-2 mr-2' size='sm' onClick={() => {
                    handleButtonClicked("REJECTED")
                  }}>Reject</Button>
                </div> : ""}

                {buttonClicked === "RESOLVED" &&
                    <Modal isOpen={isOpen} onOpenChange={onClose}>
                      <ModalContent>
                        {(onClose) => (
                            <>
                              <ModalHeader className="flex flex-col gap-1 font-extrabold">Resolve Ticket</ModalHeader>
                              <ModalBody>
                                <div>
                                  <CustomTextWithoutValidations
                                      required
                                      name="note"
                                      label="Note:"
                                      variant="bordered"
                                      placeholder="Enter ticket note about the issue."
                                      className="w-full"
                                      onValChange={handleResoledNote}
                                  />
                                </div>

                              </ModalBody>
                              <ModalFooter>
                                <Button color="success" onPress={onClose} onClick={() => updateStatus(ticketId,"RESOLVED",resolvedNote)}>
                                  Resolve
                                </Button>
                              </ModalFooter>
                            </>
                        )}
                      </ModalContent>
                    </Modal>}

                {buttonClicked === "REJECTED" &&
                    <Modal isOpen={isOpen} onOpenChange={onClose}>
                      <ModalContent>
                        {(onClose) => (
                            <>
                              <ModalHeader className="flex flex-col gap-1 font-extrabold">Reject Ticket</ModalHeader>
                              <ModalBody>
                                <div>
                                  <Textarea
                                      required
                                      label="Note:"
                                      variant="bordered"
                                      labelPlacement="outside"
                                      placeholder="Enter ticket note about the issue."
                                      className="w-full"
                                      onValueChange={handleRejectedNote}
                                  />
                                </div>

                              </ModalBody>
                              <ModalFooter>
                                <Button color="danger" className='text-white' onPress={onClose} onClick={() => updateStatus(ticketId,"REJECTED",rejectNote)}>
                                  Reject
                                </Button>
                              </ModalFooter>
                            </>
                        )}
                      </ModalContent>
                    </Modal>}


              </div>

              {(currentStatus === "Resolved" || currentStatus === "Rejected") ?
                  <div className='col-span-12 md:col-span-5 border-2 p-2'>
                    <div className='font-extrabold mb-4'>Note</div>
                    <div>The payment issue for your ticket has been successfully resolved. The transaction has now been
                      completed, and your ticket is confirmed. Thank you for your patience. If you have any further
                      questions or concerns, please do not hesitate to reach out to our support team.
                    </div>
                  </div>
                  : (
                      <div className='border-2 col-span-12 md:col-span-5 p-2'>
                        <div className='flex justify-center items-center h-full'>Issue is not addressed yet.</div>
                      </div>)}
            </div>

            <div className='flex gap-4  '>
              <div>
                <div className='mb-4 mt-4 font-semibold'>Ticket Creater Details</div>
                <div className='flex gap-2 items-center'>
                  <Image className="w-16 h-16 rounded-md mb-2" src={avatar} alt="candidate picture"/>
                  <div>
                    <div className='ml-2'>{name}</div>
                    {/*{ticketData[1].jobTitle ? <div className="flex mb-1 ml-2 w-full">*/}
                    {/*  /!* <p className="text-sm">Job Title : </p> *!/*/}
                    {/*  /!* <p className="text-sm">{ticketData[0].jobTitle}</p> *!/*/}
                    {/*</div> : <p> This is a support Request or other type.</p>}*/}
                    <Button className='bg-recruitBlue text-white mb-2 mr-2' size='sm' as={Link}
                            href='../chat'>Chat</Button>
                    <Button className='bg-recruitBlue text-white mb-2 mr-2' size='sm' as={Link}
                            href='../candidate-profile/12'>View Profile</Button>
                    <Button className='bg-recruitBlue text-white mb-2' size='sm' as={Link} href='../../jobs/12'>View Job
                      Post</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}


    </>
  )
}

export default TicketDetails
