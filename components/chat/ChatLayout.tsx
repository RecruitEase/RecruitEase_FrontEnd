"use client";
import React from "react";
import { Chip } from "@nextui-org/chip";
import { Input, Avatar, Button } from "@nextui-org/react";
import { SearchIcon } from "../icons/searchicon";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ChatUser from "./ChatUser";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  MsgProp,
  SenderProp,
  getGenericUserDetailProps,
  getChatsProps,
} from "@/types";
import { getGenericUserDetails, getChatMessages } from "@/lib/api";

const nChats = 24;

function ChatLayout() {
  const [chatMessages, setChatMessages] = useState<string[]>([]); // List of user IDs
  const [chatUsers, setChatUsers] = useState<getGenericUserDetailProps[]>([]);
  const [senders, setSenders] = useState<SenderProp[]>([]); // Final formatted senders
  const { data: session } = useSession();
  const myId = session?.user?.id as string;

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // Fetch chat messages (user IDs)
        const userIds = await getChatMessages(myId);
        setChatMessages(userIds);

        // Fetch user details for those IDs
        if (userIds.length > 0) {
          const userDetails = await getGenericUserDetails(userIds);
          setChatUsers(userDetails);

          // Transform data into `senders` format
          const mappedSenders = userDetails.map(
            (user: { name: any; role: any }) => ({
              img: "/test/png", // Placeholder image
              name: user.name, // Name from user details
              lastMsg: {
                content: user.role, // Use role as the last message content
                timestamp: null, // Timestamp is unspecified
              },
              unreadCount: null, // Set to null as instructed
              isOnline: null, // Set to null as instructed
            })
          );
          setSenders(mappedSenders); // Update senders state
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();
  }, [myId]);

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
