"use client";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import { v4 as uuid } from "uuid";
import {getInterviewById} from "@/lib/api";
import {Bounce, toast} from "react-toastify";
import LoadingComponent from "@/components/LoadingComponent";

const Room = () => {
    const [hasAccess,setHasAccess]=useState(false)
    const { data: session } = useSession();
    const fullName = session?.user?.roleDetails.firstName+" "+session?.user?.roleDetails.lastName || "Guest";
    const params = useParams<{roomid:string}>()
    const roomID = params.roomid; //room id is interview id. so check whether the logged in user have access
    const router=useRouter()
    useEffect(() => {
        const res=getInterviewById(roomID);
        res.then((response)=>{
            //if role is candidate check candidateid
            //if role is recruiter check recruiterId
            if(session?.user.role=="candidate" && response.candidateId==session.user.roleDetails.candidateId){
                    setHasAccess(true)
            }else if(session?.user.role=="recruiter" && response.recruiterId==session.user.roleDetails.recruiterId){
                setHasAccess(true)
            }else{
                //unauthorized. redirect to home page
                toast.error('Unauthorized! ', {
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
                router.push('/');
            }
            console.log(response)
        }).catch((e)=>{
            console.log(e)
            toast.error('Error occurred! ', {
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
            router.push('/');
        })

    }, [roomID]);

    let myMeeting: any = async (element: any) => {
        // generate Kit Token
        const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            uuid(),
            fullName || "user" + Date.now(),
            720
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Shareable link",
                    url:
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        window.location.pathname +
                        "?roomID=" +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            maxUsers: 10,
        });
    };

    if(hasAccess){
        return <div className="w-full h-screen" ref={myMeeting}></div>;
    }else{
        return <LoadingComponent />
    }
};

export default Room;