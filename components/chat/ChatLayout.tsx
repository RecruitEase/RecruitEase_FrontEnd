"use client";
import React from "react";
import { Chip } from "@nextui-org/chip";
import { Input, Avatar, Button } from "@nextui-org/react";
import { SearchIcon } from "../icons/searchicon";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { sendError } from "next/dist/server/api-utils";
import ChatUser from "./ChatUser";
import ChatMsg from "./ChatMsg";
import { MsgProp, SenderProp } from "@/types";
import { MailIcon } from "../icons";
const nChats = 24;

const senders: SenderProp[] = [
  {
    img: "/assets/landing/jane.png",
    name: "Mary Jane",
    lastMsg: {
      content: "Every time I attempt to launch the software, it crashes",
      timestamp: "12:00",
    },
    unreadCount: 2,
    isOnline: true,
  },
  {
    img: "/assets/users/5.jpg",
    name: "John Doe",
    lastMsg: {
      content: "Is there an update available for the app?",
      timestamp: "15:30",
    },
    unreadCount: 1,
    isOnline: false,
  },
  {
    img: "/assets/users/1.jpg",
    name: "Emily Clark",
    lastMsg: {
      content: "The app freezes when I try to upload a file.",
      timestamp: "10:45",
    },
    unreadCount: 3,
    isOnline: true,
  },
  {
    img: "/assets/users/4.jpg",
    name: "Alex Johnson",
    lastMsg: {
      content: "Can I get a refund for my purchase?",
      timestamp: "11:15",
    },
    unreadCount: 5,
    isOnline: false,
  },
  {
    img: "/assets/users/6.jpg",
    name: "Michael Smith",
    lastMsg: {
      content: "How do I reset my password?",
      timestamp: "12:30",
    },
    unreadCount: 0,
    isOnline: true,
  },
  {
    img: "/assets/users/2.jpg",
    name: "Sarah Lee",
    lastMsg: {
      content: "Is there a way to change the language settings?",
      timestamp: "14:00",
    },
    unreadCount: 4,
    isOnline: false,
  },
];

const messages: MsgProp[] = [
  {
    content:
      "Hello, I'm having some trouble with a piece of software I recently downloaded from your site. It keeps crashing every time I try to open it.",
    img: "/assets/chatss.png",
    timestamp: "13:00",
  },
  {
    content: "Every time I attempt to launch the software, it crashes",
    timestamp: "14:00",
  },
  {
    content:
      "Hi, I've been experiencing some issues with the app not responding.",
    timestamp: "15:00",
  },
  {
    content: "Is there an update available for the app?",
    timestamp: "15:30",
  },
  {
    content:
      "Hello, I'm facing an issue with the app freezing during file uploads.",
    timestamp: "10:30",
  },
  {
    content: "The app freezes when I try to upload a file.",
    timestamp: "10:45",
  },
  {
    content:
      "Hi, I'm not satisfied with the product and would like to request a refund.",
    timestamp: "11:00",
  },
  {
    content: "Can I get a refund for my purchase?",
    timestamp: "11:15",
  },
  {
    content: "Hey, I'm unable to log in and need help resetting my password.",
    timestamp: "12:15",
  },
  {
    content: "How do I reset my password?",
    timestamp: "12:30",
  },
  {
    content: "Hi, I'd like to change the language settings in the app.",
    timestamp: "13:45",
  },
  {
    content: "Is there a way to change the language settings?",
    timestamp: "14:00",
  },
];

const logedUser: SenderProp = {
  img: "/assets/landing/superman.jpg",
  name: "Chathura Lakshan",
  lastMsg: {
    content: "Hello, how are you?",
    timestamp: "12:00",
  },
  unreadCount: 2,
  isOnline: true,
};

function ChatLayout() {
  const [selectedUser, setSelectedUser] = React.useState<SenderProp | null>(
    null
  );

  const handleUserClick = (sender: SenderProp) => {
    setSelectedUser(sender);
  };

  return (
    <div className="grid grid-cols-12 gap-1 border-1 border-gray-400 h-[800px] rounded-xl">
      <div className="hidden lg:block col-span-12 lg:col-span-4 lg:border-r-1 border-gray-400">
        <div className="flex items-center gap-2 h-[24px] p-5 mt-2 font-semibold text-lg">
          Chats <Chip size="sm">{nChats}</Chip>
        </div>
        <div className="p-5 pb-0">
          <Input
            classNames={{
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon />}
            type="search"
          />

          <div className="flex w-full flex-col mt-2 justify-center">
            <Tabs fullWidth aria-label="Options">
              <Tab key="inbox" title="Inbox">
                <Card className="h-[615px] shadow-none border-none ">
                  <CardBody className="flex flex-col gap-3">
                    {senders.map((sender, index) => (
                      <ChatUser
                        handleClick={handleUserClick}
                        key={index}
                        sender={sender}
                      />
                    ))}
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="unread" title="Unread">
              <Card className="h-[615px] shadow-none border-none ">
                  <CardBody className="flex flex-col gap-3">
                    {senders.map((sender, index) => {
                      if(sender.unreadCount > 0){
                      return(
                      <ChatUser
                        handleClick={handleUserClick}
                        key={index}
                        sender={sender}
                      />
                    )}})}
                  </CardBody>
                </Card>

              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <div className=" col-span-12 lg:col-span-8">
        {selectedUser != null && (
          <>
            <div className="w-full h-[80px] grid grid-cols-12 grid-rows-2 gap-y-0 gap-x-2 border-b-1 border-gray-400">
              <div className="col-start-1 col-end-3 row-start-1 row-end-3 flex overflow-hidden justify-center items-center ">
                <Avatar src={selectedUser.img} size="lg" />
              </div>
              <div className="col-start-3 col-end-9 row-start-1 row-end-2 flex overflow-hidden justify-start items-end font-semibold">
                {selectedUser.name}
              </div>
              <div className="col-start-3 col-end-9 row-start-2 row-end-3 flex overflow-hidden justify-start items-start">
                {selectedUser.isOnline && (
                  <div className="flex gap-2 items-center">
                    <span className=" bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                    Online
                  </div>
                )}
                {!selectedUser.isOnline && (
                  <div className="flex gap-2 items-center">
                    <span className=" bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                    Offline
                  </div>
                )}
              </div>
              <div className="col-start-9 col-end-13 row-span-2 flex items-center justify-center">
<Button className="bg-recruitBlue text-whiteText">
  Check Profile
</Button>
              </div>
            </div>
            <div className="flex flex-col gap-3 h-[640px] p-5 overflow-y-scroll">

            {messages.map((msg, index) => {
  const sender = Math.random() < 0.5 ? (logedUser) : selectedUser;
  return <ChatMsg key={index} sender={sender} msg={msg} isSenderLoggedUser={sender==logedUser}/>;
})}
              
            </div>
            <div className="w-full">
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
         <span className="absolute inset-y-0 flex items-center">
         <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
               </svg>
            </button>
         </span>
         <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 flex-wrap" />
         <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            
            <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
               <span className="font-bold">Send</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
         </div>
      </div>
   </div>

            </div>

            
          </>
        )}
      </div>
    </div>
  );
}

export default ChatLayout;
