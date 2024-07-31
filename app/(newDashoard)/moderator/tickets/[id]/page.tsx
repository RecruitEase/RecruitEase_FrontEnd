"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import React from 'react'
import { Button, Autocomplete, AutocompleteItem, Card, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, Divider, Chip, divider } from "@nextui-org/react"
import CustomTextWithoutValidations from "@/components/form_inputs/CustomTextAreaWithoutValidations"
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const status = [
  { label: "Under Review", value: "underReview" },
  { label: "Resolved", value: "resolved" },
  { label: "Rejected", value: "rejected" },
]

const ticketData = [
  {
    id: 1,
    delay: "1h ago",
    ticketId: "#11212121",
    subject: "Payment Issue",
    type: "Job Offer",
    jobTitle: "Software Developer",
    date: "2024/12/12",
    status: "UnderReview",
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    description: "A ticket related to a payment issue for a job offer. The issue is currently under review and needs resolution."
  },
  {
    id: 2,
    delay: "1d ago",
    ticketId: "#11212122",
    subject: "Project Update",
    type: "Team Task",
    jobTitle: "Software Developer",
    date: "2024/07/26",
    status: "Resolved",
    name: "Zoey Lang",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    description: "Update on the current project status for the development team. The task has been reviewed and is pending further action."
  },
  {
    id: 3,
    delay: "2d ago",
    ticketId: "#11212123",
    subject: "Code Review",
    type: "Development Task",
    date: "2024/07/26",
    status: "Resolved",
    name: "Jane Fisher",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    description: "Code review in progress for the development team. This task has been reviewed and involves evaluating recent code submissions."
  },
  {
    id: 4,
    delay: "30m ago",
    ticketId: "#11212124",
    subject: "Marketing Strategy",
    type: "Campaign Plan",
    date: "2024/07/26",
    status: "Rejected",
    name: "William Howard",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    description: "Vacation notice for marketing strategy discussions. The planning and execution have been rejected until the return from vacation."
  },
  {
    id: 5,
    delay: "5h ago",
    ticketId: "#11212125",
    subject: "Sales Report",
    type: "Performance Review",
    date: "2024/07/26",
    status: "Resolved",
    name: "Kristen Copper",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    description: "Active task to review and finalize the sales report. The report has been reviewed and assesses the performance and strategies of the sales team."
  },
]

const recruiterData = [
  {
    id: 1,
    name: "Brian Industries",
    avatar: "/assets/BI.png",
  }
]

function TicketDetails() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonClicked, setButtonClicked] = React.useState("");
  const [currentStatus, setCurrentStatus] = React.useState("UnderReview")
  const router = useRouter()


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

      <div className='grid grid-cols-12 '>

        <div className='col-span-12 md:col-span-7'>
          <div className='mb-4'>
            <div className=" font-bold text-xl mb-4">{ticketData[0].subject}</div>
            {currentStatus === "UnderReview" &&
              <Chip className="capitalize min-w-24 text-center mb-2 ml-auto" color="warning" size="sm" variant="flat">
                UnderReview
              </Chip>}
            {currentStatus === "Resolved" &&
              <Chip className="capitalize min-w-24 text-center mb-2 ml-auto" color="success" size="sm" variant="flat">
                Resolved
              </Chip>}
            {currentStatus === "Rejected" &&
              <Chip className="capitalize min-w-24 text-center mb-2 ml-auto" color="danger" size="sm" variant="flat">
                Rejected
              </Chip>}
            <div className="flex">
              <p className="text-sm">{ticketData[0].date}</p>
            </div>
            <div className="flex">
              <p className="text-sm">Id : </p>
              <p className="text-sm pl-2">{ticketData[0].ticketId}</p>
            </div>
            <div className="flex">
              <p className="text-sm">Type : </p>
              <p className='text-sm pl-2'>{ticketData[0].type}</p>
            </div>
            <div >
              {ticketData[0].jobTitle &&
                <div className="flex mb-2">
                  <p className="text-sm">Job Title : </p>
                  <p className="text-sm pl-2">{ticketData[0].jobTitle}</p>
                </div>}
            </div>
            <div><p className="">Description :</p></div>
            <div className='mb-2'>{ticketData[0].description}</div>
          </div>

          {(currentStatus === "UnderReview") && <div>
            <Button className='bg-success text-white  mb-2 mr-2' size='sm' onClick={() => { handleButtonClicked("resolve") }}>Resolve</Button>
            <Button className='bg-danger text-white  mb-2 mr-2' size='sm' onClick={() => { handleButtonClicked("reject") }}>Reject</Button>
          </div>}

          {buttonClicked === "resolve" &&
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
                        />
                      </div>

                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onPress={onClose} onClick={() => {
                        handleCurrentStatus("Resolved");
                        toast.success('Ticket resolved!', {
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
                        // router.push('/candidate/tickets/details');
                      }}>
                        Resolve
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>}

          {buttonClicked === "reject" &&
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
                        />
                      </div>

                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" className='text-white' onPress={onClose} onClick={() => {
                        handleCurrentStatus("Rejected");
                        toast.error('Ticket rejected!', {
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
                        // router.push('/moderator/tickets/details');
                      }}>
                        Reject
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>}



        </div >

        {(currentStatus === "Resolved" || currentStatus === "Rejected") ?
          <div className='col-span-12 md:col-span-5 border-2 p-2'>
            <div className='font-extrabold mb-4'>Note</div>
            <div>The payment issue for your ticket has been successfully resolved. The transaction has now been completed, and your ticket is confirmed. Thank you for your patience. If you have any further questions or concerns, please do not hesitate to reach out to our support team.</div>
          </div>
          : (
            <div className='border-2 col-span-12 md:col-span-5 p-2'>
              <div className='flex justify-center items-center h-full'  >Issue is not addressed yet.</div>
            </div>)}
      </div>

      <div className='flex gap-4  '>
        <div>
          <div className='mb-4 mt-4 font-semibold'>Ticket Creater Details</div>
          <div className='flex gap-2 items-center'>
            <img className="w-16 h-16 rounded-md mb-2" src={ticketData[1].avatar} alt="candidate picture" />
            <div>
              <div className='ml-2'>{ticketData[0].name}</div>
              {ticketData[1].jobTitle ? <div className="flex mb-1 ml-2 w-full">
                {/* <p className="text-sm">Job Title : </p> */}
                {/* <p className="text-sm">{ticketData[0].jobTitle}</p> */}
              </div> : <p> This is a support Request or other type.</p>}
              <Button className='bg-recruitBlue text-white mb-2 mr-2' size='sm' as={Link} href='../chat'>Chat</Button>
              <Button className='bg-recruitBlue text-white mb-2 mr-2' size='sm' as={Link} href='../candidate-profile/12'>View Profile</Button>
              <Button className='bg-recruitBlue text-white mb-2' size='sm' as={Link} href='../../jobs/12'>View Job Post</Button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default TicketDetails
