"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const CometChatNoSSR = dynamic(() => import("../../../../../components/newChat/CometChatNoSSR"), {
    ssr: false,
});

function Chat() {
    useEffect(() => {
        window.CometChat = require("@cometchat/chat-sdk-javascript").CometChat;
    });

    return (
        <div>
            <CometChatNoSSR />
        </div>
    );
}

export default Chat;





//
// "use client";
// import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
// import {CometChatConversationsWithMessages, CometChatUIKit} from "@cometchat/chat-uikit-react";
//
// const COMETCHAT_CONSTANTS = {
//   APP_ID: "267133c7127f821d", //Replace with your App ID
//   REGION: "in", //Replace with your App Region
//   AUTH_KEY: "faa61cff5f650375245bf1035bfc3b73baf8a813", //Replace with your Auth Key or leave blank if you are authenticating using Auth Token
// };
//
// //create the builder
// const UIKitSettings = new UIKitSettingsBuilder()
//     .setAppId(COMETCHAT_CONSTANTS.APP_ID)
//     .setRegion(COMETCHAT_CONSTANTS.REGION)
//     .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
//     .subscribePresenceForAllUsers()
//     .build();
// const UID = "UID"; //Replace with your UID
//
// //Initialize CometChat UI Kit
// CometChatUIKit.init(UIKitSettings)
//     .then(() => {
//       console.log("Initialization completed successfully");
//       // You can now call login function.
//
//
//
//     })
//     .catch(console.log);



// CometChatUIKit.getLoggedinUser().then((user: CometChat.User) => {
//     if (!user) {
//         //Login user
//         CometChatUIKit.login(UID)
//             .then((user: CometChat.User) => {
//                 console.log("Login Successful:", { user });
//                 //mount your app
//                 return <CometChatConversationsWithMessages />
//             })
//             .catch(console.log);
//     } else {
//         //mount your app
//     }
// });

// import React, {useEffect} from 'react';
// import {useSession} from "next-auth/react";
// import {CometChat} from "@cometchat/chat-sdk-javascript";
//
// function Page() {
//     const { data: session } = useSession();
//
//     const user=session!.user;
//     //create user
//     const uid=user.id;
//     const name=user.roleDetails.firstName+" "+user.roleDetails.lastName;
//
//     useEffect(() => {
//         var chatUser=new CometChat.User(uid);
//         chatUser.setName(name)
//         CometChat.createUser(chatUser,COMETCHAT_CONSTANTS.AUTH_KEY).then(
//             user=>{
//                 console.log("user created",chatUser)
//             },error=>{
//                 console.log("error while creating user",error)
//             }
//         )
//
//         CometChat.login(uid,COMETCHAT_CONSTANTS.AUTH_KEY).then(
//             user=>{
//                 console.log("Logged in successfully!",{user});
//             },error=>{
//                 console.log("Error while logging in",{error})
//             }
//         )
//
//
//     }, []);
//
//
//     return (
//         <div className={"h-screen"}><CometChatConversationsWithMessages  /></div>
//     );
// }
//
// export default Page;

