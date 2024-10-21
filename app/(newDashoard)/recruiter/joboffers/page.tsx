"use client"
import React, {useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import JobListTable from "@/components/jobListrecRutiter/jobListTable";
import {
    Chip,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import Swal from "sweetalert2";
import {Bounce, toast} from "react-toastify";
import {Button} from "@nextui-org/button";
import {useOffersByRecruiter, useUpdateOfferMutation} from "@/lib/hooks/useOffers";
import {useSession} from "next-auth/react";
import {useCandidates} from "@/lib/hooks/useCandidates";
import {useJobs} from "@/lib/hooks/useJobs";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import JobOfferForm from "@/components/sendJobOffer/jobOfferForm";
import {OfferUpdateProps, OfferUpdateQueryProps, RowProp, statusColorMap, statusOptions} from "@/types/offers";
import JobOfferFormDisabled, {JobOfferFormDisabledProps} from "@/components/sendJobOffer/jobOfferFormDisabled";

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


    //for user session state
    const { data: session } = useSession();
    console.log({ session });

    const user=session?.user;

    const offersByRecruiterQuery=useOffersByRecruiter(user?.roleDetails.recruiterId)

    // Extract recruiterIds and get unique ids
    const candidateIdList: string[] = [];
    const jobIdList: string[] = [];

    offersByRecruiterQuery.data?.map(job => {
        if (candidateIdList.indexOf(job.candidateId!) === -1) {
            candidateIdList.push(job.candidateId!)
        }
        if (jobIdList.indexOf(job.jobId!) === -1) {
            jobIdList.push(job.jobId!)
        }
    });

    const candidateBatchQuery=useCandidates(candidateIdList)
    const jobBatchQuery=useJobs(jobIdList)

    const [selectedCard, setSelectedCard] = useState<RowProp | null>(null);

    
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    
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

    const offerUpdateQuery=useUpdateOfferMutation();

    const updateOffer=(data:RowProp)=>{
        const updateObj:OfferUpdateProps={
        offerId:data.offerId!,
        status:"CANCELED",
        statusChangeNote:"Offer Withdrew by the recruiter!"
    }

    const reqObj:OfferUpdateQueryProps={
        updateReq:updateObj,
        candidateId:data.candidate?.candidateId,
        recruiterId:data.recruiterId
    }
    offerUpdateQuery.mutate(reqObj)
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



    const popupview = (data: RowProp) => {
        setSelectedCard(data);
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
                                    src={(selectedCard?.candidate?.profilePic)?process.env.NEXT_PUBLIC_S3_URL+selectedCard?.candidate?.profilePic : "/profileImages/noImage.png"}
                                    width={30}
                                />
                            </div>
                            <div className={"flex flex-col justify-center"}>{selectedCard?.name} </div>

                        </ModalHeader>
                        <ModalBody className={"gap-0"}>
                            <JobOfferFormDisabled job={selectedCard?.job!} candidate={selectedCard?.candidate!} offer={selectedCard!} />
                            <Spacer y={5}/>
                            <div className={"gap-2 text-md font-bold  flex justify-start"}>Status</div>
                            <div><Chip className="capitalize min-w-32 text-center "
                                       style={{ backgroundColor: statusColorMap[selectedCard?.status!], color:"#000000"}}
                                       size="md"
                                       variant="flat">
                                {statusOptions.find(s=>s.uid==selectedCard?.status!)!.name}
                            </Chip></div>
                            <Spacer y={5}/>
                            <div className={"gap-2 text-md font-bold  flex justify-start"}>Note</div>
                            <div>{selectedCard?.statusChangeNote || "No note yet!"}</div>
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
            {
                (offersByRecruiterQuery.isFetching || candidateBatchQuery.isFetching || jobBatchQuery.some(query => query.isFetching)) ?
                    <LoadingComponent/>
                    : (offersByRecruiterQuery.isError || candidateBatchQuery.isError || jobBatchQuery.some(query => query.isError)) ?
                        < ErrorComponent/>
                        :
                        <JobListTable updateOffer={updateOffer} offers={offersByRecruiterQuery.data!} candidates={candidateBatchQuery.data!} jobs={jobBatchQuery} popup={popupview}/>
            }
        </div>
    )
}

export default jobList;