"use client";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import { Avatar, Button } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatMsg from "@/components/chat/ChatMsg";
import { MsgProp, SenderProp } from "@/types";
import { CandidateProp } from "@/types/users";
import { getCandidate } from "@/lib/api";

function ChatLayout() {
  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL;
  const [messages, setMessages] = useState<MsgProp[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [candidateData, setCandidateData] = useState<CandidateProp>();
  const { data: session } = useSession();
  const params = useParams<{ id: string }>();

  const senderId = session?.user?.id;
  const recipientCandidateId = params?.id as string;

  useEffect(() => {
    const res = getCandidate(recipientCandidateId);
    res.then((data) => {
      setCandidateData(data);
    });
  });
  const recipientId = candidateData?.id;
  const name = candidateData?.firstName + " " + candidateData?.lastName;
  const profileImage = candidateData?.profilePic;

  // Initialize WebSocket connection
  useEffect(() => {
    if (senderId && recipientId) {
      const socket = new SockJS(CHAT_URL + "/ws");
      const client = Stomp.over(socket);

      client.connect({}, () => {
        console.log("WebSocket connected.");
        client.subscribe(`/user/${senderId}/queue/messages`, (payload) => {
          const message = JSON.parse(payload.body);
          setMessages((prev) => [...prev, message]);
        });

        // Fetch chat history
        fetch(CHAT_URL + `/messages/${senderId}/${recipientId}`)
          .then((response) => response.json())
          .then((data) => setMessages(data))
          .catch((error) => console.error("Error fetching messages:", error));
      });

      client.onDisconnect = () => console.log("WebSocket disconnected.");

      setStompClient(client);

      return () => {
        client.disconnect(() => {
          console.log("WebSocket connection closed.");
        });
      };
    }
  }, [senderId, recipientId]);

  // Send a message
  const handleSendMessage = () => {
    if (newMessage.trim() && stompClient && stompClient.connected) {
      const chatMessage: MsgProp = {
        content: newMessage,
        senderId,
        recipientId,
        timestamp: new Date().toISOString(),
      };

      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setMessages((prev) => [...prev, chatMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="grid grid-cols-12 gap-1 border-1 border-gray-400 h-[800px] rounded-xl">
      <div className="col-span-12 w-full h-[800px]  rounded-xl shadow-lg">
        <div className="w-full h-[80px] grid grid-cols-12 grid-rows-2 gap-y-0 gap-x-2 border-b-1 border-gray-400">
          <div className="col-start-1 col-end-3 row-start-1 row-end-3 flex overflow-hidden justify-center items-center">
            <Avatar src={profileImage} size="lg" />
          </div>
          <div className="col-start-3 col-end-9 row-start-1 row-end-2 flex overflow-hidden justify-start items-end font-semibold">
            {name}
          </div>
          <div className="col-start-9 col-end-13 row-span-2 flex items-center justify-center">
            <Button className="bg-recruitBlue text-whiteText">
              Check Profile
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 h-[640px] p-5 overflow-y-scroll">
          {messages.map((msg, index) => (
            <ChatMsg
              key={index}
              sender={{ img: "/assets/landing/superman.jpg", name: "User" }}
              msg={msg}
              isSenderLoggedUser={msg.senderId === senderId}
            />
          ))}
        </div>

        <div className="w-full border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Write your message!"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
            />
            <button
              onClick={handleSendMessage}
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLayout;
