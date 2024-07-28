"use client";
import React from "react";
import { Chip } from "@nextui-org/chip";
import { Input,Avatar } from "@nextui-org/react";
import { SearchIcon } from "../icons/searchicon";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { sendError } from "next/dist/server/api-utils";
import ChatUser from "./ChatUser";
import { SenderProp } from "@/types";

const nChats = 24;
const sender:SenderProp={
    img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    name: "John Doe",
    lastMsg: {
        content: "Hello, how are you?",
        timestamp: "12:00",
    },
    unreadCount: 2,
}
function ChatLayout() {
  return (
    <div className="grid grid-cols-12 gap-1 border-1 border-gray-400 h-[800px] rounded-xl">
      <div className="col-span-4 border-r-1 border-gray-400">
        <div className="flex items-center gap-2 h-[24px] p-5 mt-2 font-semibold text-lg">
          Chats <Chip size="sm">{nChats}</Chip>
        </div>
        <div className="p-5">
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
                <Card className="h-[620px] shadow-none border-none ">
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

      <div className="col-span-8"></div>
    </div>
  );
}

export default ChatLayout;
