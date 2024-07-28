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
const sender: SenderProp = {
  img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  name: "John Doe",
  lastMsg: {
    content: "Hello, how are you?",
    timestamp: "12:00",
  },
  unreadCount: 2,
  isOnline: true,
};

const msg1:MsgProp={
    content:"Hello, I'm having some trouble with a piece of software I recently downloaded from your site. It keeps crashing every time I try to open it.",
    img:"/assets/chatss.png",
    timestamp:"13:00"
}

const msg2:MsgProp={
    content:"Every time I attempt to launch the software, it crashes",
    timestamp:"14:00"
}
function ChatLayout() {
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
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                    <ChatUser {...sender} />
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="unread" title="Unread"></Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <div className=" col-span-12 lg:col-span-8">
        <div className="w-full h-[80px] grid grid-cols-12 grid-rows-2 gap-y-0 gap-x-2 border-b-1 border-gray-400">
          <div className="col-start-1 col-end-3 row-start-1 row-end-3 flex overflow-hidden justify-center items-center ">
            <Avatar src={sender.img} size="lg" />
          </div>
          <div className="col-start-3 col-end-9 row-start-1 row-end-2 flex overflow-hidden justify-start items-end font-semibold">
            {sender.name}
          </div>
          <div className="col-start-3 col-end-9 row-start-2 row-end-3 flex overflow-hidden justify-start items-start">
            {sender.isOnline && (
              <div className="flex gap-2 items-center"><span className=" bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>Online</div>
            )}
            {!sender.isOnline && (
              <div className="flex gap-2 items-center"><span className=" bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>Offline</div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">

        <ChatMsg sender={sender} msg={msg1} />
        <ChatMsg sender={sender} msg={msg2} />

        </div>

      </div>
    </div>
  );
}

export default ChatLayout;
