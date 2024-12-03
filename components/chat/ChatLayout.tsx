"use client";
import React from "react";
import { Chip } from "@nextui-org/chip";
import { Input, Avatar, Button } from "@nextui-org/react";
import { SearchIcon } from "../icons/searchicon";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ChatUser from "./ChatUser";
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
      <div className="hidden lg:block col-span-12 lg:border-r-1 border-gray-400">
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
                      if (sender.unreadCount > 0) {
                        return (
                          <ChatUser
                            handleClick={handleUserClick}
                            key={index}
                            sender={sender}
                          />
                        );
                      }
                    })}
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLayout;
