"use client"
import React, {useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import JobListTable from "@/components/jobListrecRutiter/jobListTable";
import {
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import Swal from "sweetalert2";
import {Bounce, toast} from "react-toastify";
import {Button} from "@nextui-org/button";

type userDetails = {
    id: number,
    name: string,
    role:string,
    team:string,
    status:string,
    avatar:string,
    email:string,
    date:string,
    candidateNote:string
}

const users:userDetails[] = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "canceled",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
        date:"2024/10/05",
        candidateNote:"Thank you very much for offering me the [Job Title] position. After careful consideration, I have decided to decline the offer as I have chosen to pursue another opportunity that aligns more closely with my career goals."
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "brian.kim@example.com",
        status: "confirmed",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
        email: "michael.hunt@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
        email: "samantha.brooks@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "canceled",
        avatar: "https://i.pravatar.cc/150?img=4",
        email: "frank.harrison@example.com",
        date:"2024/10/05",
        candidateNote:"Thank you very much for offering me the [Job Title] position. After careful consideration, I have decided to decline the offer as I have chosen to pursue another opportunity that aligns more closely with my career goals."
    },
    {
        id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?img=5",
        email: "emma.adams@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 11,
        name: "Brandon Stevens",
        role: "Jr. Dev",
        team: "Development",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?img=8",
        email: "brandon.stevens@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 12,
        name: "Megan Richards",
        role: "P. Manager",
        team: "Product",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?img=10",
        email: "megan.richards@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 13,
        name: "Oliver Scott",
        role: "S. Manager",
        team: "Security",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?img=12",
        email: "oliver.scott@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 14,
        name: "Grace Allen",
        role: "M. Specialist",
        team: "Marketing",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?img=16",
        email: "grace.allen@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 15,
        name: "Noah Carter",
        role: "IT Specialist",
        team: "I. Technology",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?img=15",
        email: "noah.carter@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 16,
        name: "Ava Perez",
        role: "Manager",
        team: "Sales",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?img=20",
        email: "ava.perez@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 17,
        name: "Liam Johnson",
        role: "Data Analyst",
        team: "Analysis",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?img=33",
        email: "liam.johnson@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 18,
        name: "Sophia Taylor",
        role: "QA Analyst",
        team: "Testing",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?img=29",
        email: "sophia.taylor@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 19,
        name: "Lucas Harris",
        role: "Administrator",
        team: "Information Technology",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?img=50",
        email: "lucas.harris@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
    {
        id: 20,
        name: "Mia Robinson",
        role: "Coordinator",
        team: "Operations",
        status: "confirmed",
        avatar: "https://i.pravatar.cc/150?img=45",
        email: "mia.robinson@example.com",
        date:"2024/10/05",
        candidateNote:"I am thrilled to have received the job offer and am excited to join [Company Name]. I confirm that I will be available to start on [Mentioned Date]"
    },
];


const jobList = () =>{


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedCard, setSelectedCard] = useState<userDetails | null>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [text ,setText]=useState("")

    // Accept Button Handle-----------------------------------------------
    const acceptButtonHandle = ()=>{
        confomationPoup("Are you accept that offer?","info")
        onClose()
    }
    // Decline Button Handle--------------------------------------
    const declineButtonHandle = ()=>{
        confomationPoup("Are you decline that offer?","warning")
        onClose()
    }

    const confomationPoup = (massage:string,icon:string) =>{

        Swal.fire({
            title: massage,
            icon:"info",
            customClass: {
                confirmButton: 'bg-primary', // Custom class for confirm button
                cancelButton: 'bg-[#a1a1aa]'   // Custom class for cancel button
            },

            showCancelButton: true,
            confirmButtonText: "Yes",

        }).then(() => {
            console.log(text)
            const result = {
                status: 200
            }
            if (result?.status == 200) {
                toast.success('Deleted successfully!', {
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
                //not logged in
                //handle error here
                toast.error('Delete failed!', {
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

            setText("")
        });
    }



    const popupview = (card: userDetails) => {
        console.log("Card clicked:", card);
        setSelectedCard(card);
        onOpen();
    };

    const myPopUp = (
        <Modal size={"2xl"} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-row gap-2">
                            <div>
                                <Image
                                    alt="company logo"
                                    height={30}
                                    radius="sm"
                                    src={selectedCard?.avatar}
                                    width={30}
                                />
                            </div>
                            <div className={"flex flex-col justify-center"}>{selectedCard?.name} </div>

                        </ModalHeader>
                        <ModalBody className={"gap-0"}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <div className={"gap-2 text-md font-bold  flex justify-start"}>Candidate's Note</div>
                            <div>{selectedCard?.candidateNote}</div>
                            {/*<div className={"mb-4 text-warningText"}><p>This job offer is accept or decline on or before {selectedCard?.cutoffTime} {selectedCard?.cutoffDate}</p></div>*/}
                            {/*<div className={"flex gap-4"}>*/}
                            {/*    <div className={"flex flex-col mb-4 text-sm font-bold text-gray-600"}>*/}
                            {/*        <div><p>Date:</p></div>*/}
                            {/*        <div><p>Time:</p></div>*/}
                            {/*        <div><p>Dress Code:</p></div>*/}
                            {/*        <div><p>Location:</p></div>*/}
                            {/*    </div>*/}
                            {/*    <div className={"flex flex-col mb-4 text-sm font-bold text-gray-600"}>*/}
                            {/*        <div><p>{selectedCard?.date}</p></div>*/}
                            {/*        /!*<div><p>{selectedCard?.time}</p></div>*!/*/}
                            {/*        /!*<div><p>{selectedCard?.dressCode}</p></div>*!/*/}
                            {/*        /!*<div><p>{selectedCard?.location}</p></div>*!/*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={"mb-4"}><p>{selectedCard?.description}</p></div>*/}

                            {/*<div className={"flex flex-col gap-2"}>*/}

                                {/*<div className={"gap-2 text-md font-bold  flex justify-start"}><p>Add Note</p></div>*/}
                                {/*<div className={"ml-0"}>*/}
                                {/*    <Textarea*/}
                                {/*        className={"w-full ml-0"}*/}
                                {/*        name={"overview"}*/}
                                {/*        label={""}*/}
                                {/*        value={text}*/}
                                {/*        onChange={(element)=>setText(element.target.value)}*/}
                                {/*        placeholder={"Enter some note"}*/}
                                {/*        required={false}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            {/*</div>*/}

                        </ModalBody>
                        <ModalFooter>

                            <Button startContent={"<>"} color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );


    return(
        <div>
            {myPopUp}
            <header className="home-header">
                <HeaderBox type="title" title="Job Offer List" subtext="Current job offers list is here."/>
            </header>

            <JobListTable users={users} popup={popupview}/>
        </div>
    )
}

export default jobList;