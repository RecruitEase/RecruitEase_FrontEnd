// "use client";
import React, {useEffect, useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
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

import {Button} from "@nextui-org/button";
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useRouter } from 'next/navigation';

type userDetails = {
    id: number,
    interviewId:string,
    name: string,
    role:string,
    team:string,
    status:string,
    avatar:string,
    email:string,
    date:string,
    time:string,
    type: string,
    location: string,
    link:string,
    description: string
}

//
// const users:userDetails[] = [
//     {
//         id: 1,
//         name: "Tony Reichert",
//         role: "CEO",
//         team: "Management",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//         email: "tony.reichert@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."
//     },
//     {
//         id: 2,
//         name: "Zoey Lang",
//         role: "Tech Lead",
//         team: "Development",
//         status: "hold",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//         email: "zoey.lang@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."
//     },
//     {
//         id: 3,
//         name: "Jane Fisher",
//         role: "Sr. Dev",
//         team: "Development",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//         email: "jane.fisher@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."
//     },
//     {
//         id: 4,
//         name: "William Howard",
//         role: "C.M.",
//         team: "Marketing",
//         status: "canceled",
//         avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//         email: "william.howard@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Onsite",
//         location:"15/1A, 1st lane, Jambugasmulla Road, Nugegoda",
//         link:"",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."},
//     {
//         id: 5,
//         name: "Kristen Copper",
//         role: "S. Manager",
//         team: "Sales",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//         email: "kristen.cooper@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."
//     },
//     {
//         id: 6,
//         name: "Brian Kim",
//         role: "P. Manager",
//         team: "Management",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//         email: "brian.kim@example.com",
//         status: "conformed",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."},
//     {
//         id: 7,
//         name: "Michael Hunt",
//         role: "Designer",
//         team: "Design",
//         status: "hold",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
//         email: "michael.hunt@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career." },
//     {
//         id: 8,
//         name: "Samantha Brooks",
//         role: "HR Manager",
//         team: "HR",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
//         email: "samantha.brooks@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."  },
//     {
//         id: 9,
//         name: "Frank Harrison",
//         role: "F. Manager",
//         team: "Finance",
//         status: "canceled",
//         avatar: "https://i.pravatar.cc/150?img=4",
//         email: "frank.harrison@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Onsite",
//         location:"15/1A, 1st lane, Jambugasmulla Road, Nugegoda",
//         link:"",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."},
//     {
//         id: 10,
//         name: "Emma Adams",
//         role: "Ops Manager",
//         team: "Operations",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?img=5",
//         email: "emma.adams@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."},
//     {
//         id: 11,
//         name: "Brandon Stevens",
//         role: "Jr. Dev",
//         team: "Development",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?img=8",
//         email: "brandon.stevens@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."},
//     {
//         id: 12,
//         name: "Megan Richards",
//         role: "P. Manager",
//         team: "Product",
//         status: "hold",
//         avatar: "https://i.pravatar.cc/150?img=10",
//         email: "megan.richards@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career." },
//     {
//         id: 13,
//         name: "Oliver Scott",
//         role: "S. Manager",
//         team: "Security",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?img=12",
//         email: "oliver.scott@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career." },
//     {
//         id: 14,
//         name: "Grace Allen",
//         role: "M. Specialist",
//         team: "Marketing",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?img=16",
//         email: "grace.allen@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."  },
//     {
//         id: 15,
//         name: "Noah Carter",
//         role: "IT Specialist",
//         team: "I. Technology",
//         status: "hold",
//         avatar: "https://i.pravatar.cc/150?img=15",
//         email: "noah.carter@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career." },
//     {
//         id: 16,
//         name: "Ava Perez",
//         role: "Manager",
//         team: "Sales",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?img=20",
//         email: "ava.perez@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career." },
//     {
//         id: 17,
//         name: "Liam Johnson",
//         role: "Data Analyst",
//         team: "Analysis",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?img=33",
//         email: "liam.johnson@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."},
//     {
//         id: 18,
//         name: "Sophia Taylor",
//         role: "QA Analyst",
//         team: "Testing",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?img=29",
//         email: "sophia.taylor@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."  },
//     {
//         id: 19,
//         name: "Lucas Harris",
//         role: "Administrator",
//         team: "Information Technology",
//         status: "hold",
//         avatar: "https://i.pravatar.cc/150?img=50",
//         email: "lucas.harris@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career."},
//     {
//         id: 20,
//         name: "Mia Robinson",
//         role: "Coordinator",
//         team: "Operations",
//         status: "conformed",
//         avatar: "https://i.pravatar.cc/150?img=45",
//         email: "mia.robinson@example.com",
//         date:"2024/10/05",
//         time:"10.00 AM",
//         type:"Online",
//         location:"",
//         link:"https://www.youtube.com/#!",
//         description:"With any interview question you answer, tie your background to the job by providing examples of solutions and results you’ve achieved in your career." },
// ];


const JobList = async () => {

    const axios = useAxiosAuth();
    const router = useRouter();

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [text, setText] = useState("")
    const [mode, setMode] = useState("")
    const [modeName, setModeName] = useState("")
    const [users, setUsers] = useState<userDetails[]>([]);
    const applicationSet = new Set<string>();
    const [selectedCard, setSelectedCard] = useState<userDetails>();
    const [interviews,setInterviews] = useState([])
    const [userDetails, setUserDetails] = useState<userDetails[]>([]);


    const editInterview = (interviewId: string | undefined) => {
        if (interviewId) {
            router.push(`/recruiter/interviews/editInterview/${interviewId}`)
        } else {
            console.error('Interview ID is undefined. Cannot navigate to edit page.');
        }
    }

    const fetchInterviewData = () => {

        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/list`)
            .then(response => {
                const data = response.data.content;
                if (!Array.isArray(data)) {
                    console.error("Unexpected data format:", data);
                    return [];
                }
                return data;
            })
            .catch(error => {
                console.error("Error fetching interview data:", error);
                return [];
            });


    };

    const fetchApplicationDetails = (applicationId:String) => {

        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/view/${applicationId}`)
            .then(response => response.data.content)
            .catch(error => {
                console.error(`Error fetching company details for applicationId: ${applicationId}`, error);
                return null;
            });
    };


    useEffect(() => {
        // Fetch interviews first
        fetchInterviewData()
            .then(interviews => {
                // Fetch company details for each interview
                const companyDetailsPromises = interviews.map((interview: any) =>
                    fetchApplicationDetails(interview.applicationId).then(applicationDetails => ({
                        interview,
                        applicationDetails
                    }))
                );

                return Promise.all(companyDetailsPromises);
            })
            .then(results => {
                const mergedData: userDetails[] = results
                    .map(({ interview, applicationDetails }) => {
                        if (applicationDetails) {
                            return {
                                companyName: applicationDetails.companyName,
                                position: applicationDetails.position,
                                imageUrl: applicationDetails.imageUrl,
                                type: interview.type,
                                location: interview.location,
                                link: interview.link,
                                date: interview.date,
                                time: interview.time,
                                dressCode: interview.dressCode,
                                remainingDays: interview.remainingDays,
                                description: interview.description,
                            };
                        } else {
                            return null;
                        }
                    })
                    .filter((data): data is userDetails => data !== null);

                setUserDetails(mergedData);
            });
    }, []);





    const setModes = (card: userDetails) => {
        if (card.type == "Online") {
            setMode(card.link)
            setModeName("Link")
        } else if (card.type == "Onsite") {
            setMode(card.location)
            setModeName("Location")
        }
    }

    const popupview = (card: userDetails) => {
        console.log("Card clicked:", card);
        setSelectedCard(card);
        setModes(card);
        onOpen();
    };

    const myPopUp = (
        <Modal size={"2xl"} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}
               isKeyboardDismissDisabled={true}>
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
                            <div className={"flex flex-row gap-2 mb-4 text-sm font-bold text-gray-600"}>
                                <div className={"flex flex-col"}>
                                    <p>Date:</p>
                                    <p>Time:</p>
                                    <p>{modeName}</p>

                                </div>
                                <div className={"flex flex-col"}>
                                    <p>{selectedCard?.date}</p>
                                    <p>{selectedCard?.time}</p>
                                    <p>{mode}</p>
                                </div>

                            </div>
                            <div className={"mb-4"}><p>{selectedCard?.description}</p></div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary">
                                Edit
                            </Button>
                            <Button startContent={"<>"} color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );


    return (
        <div>
            {myPopUp}
            <header className="home-header">
                <HeaderBox type="title" title="Interview Schedule List" subtext="Current interview list is here."/>
            </header>
            {/*{*/}
            {/*    (interviewQuery.isFetching )?*/}
            {/*        <LoadingComponent />*/}
            {/*        :*/}
            {/*        (interviewQuery.isError )?*/}
            {/*            <ErrorComponent />*/}
            {/*        :<InterviewListTable interviews={interviewQuery.data} aplications={applicationList} candidates={candidateIdList} popup={popupview}/>*/}

            {/*}*/}
            {/*<InterviewListTable users={null} popup={popupview}/>*/}

        </div>
    )

};
export default JobList;