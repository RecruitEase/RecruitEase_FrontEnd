"use client";
import React from "react";
import { Chip } from "@nextui-org/chip";
import { Input, Avatar } from "@nextui-org/react";
import { SearchIcon } from "../icons/searchicon";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { sendError } from "next/dist/server/api-utils";
import ChatUser from "./ChatUser";
import ChatMsg from "./ChatMsg";
import { MsgProp, SenderProp } from "@/types";

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
              <Tab key="unread" title="Unread"></Tab>
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
            </div>
            <div className="flex flex-col gap-3 h-[720px] p-5 overflow-y-scroll">
            {messages.map((msg, index) => {
  const sender = Math.random() < 0.5 ? (logedUser) : selectedUser;
  return <ChatMsg key={index} sender={sender} msg={msg} isSenderLoggedUser={sender==logedUser}/>;
})}
              {/* 
        <ChatMsg sender={logedUser} msg={msg1} isSenderLoggedUser={true} />
        <ChatMsg sender={selectedUser} msg={msg2} />
        <ChatMsg sender={logedUser} msg={msg2} isSenderLoggedUser={true} /> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatLayout;
