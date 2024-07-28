import { SenderProp } from "@/types";
import React from "react";
import { Chip, Avatar } from "@nextui-org/react";

function ChatUser(sender: SenderProp) {
  return (
    <div className="grid grid-cols-12 gap-1 gap-y-0 grid-rows-2 h-[60px] rounded-md hover:bg-gray-200 cursor-pointer">
      <div className="col-start-1 col-end-3 row-start-1 row-end-3 flex overflow-hidden justify-center items-center ">
        
        <Avatar src={sender.img} size="lg" />
      </div>
      <div className="col-start-3 col-end-11 row-start-1 row-end-2 flex overflow-hidden justify-start items-end font-semibold">
        {sender.name}
      </div>
      <div className="col-start-3 col-end-11 row-start-2 row-end-3 flex overflow-hidden justify-start items-start">
        {sender.lastMsg.content}
      </div>
      <div className="col-start-11 col-end-13 row-start-1 row-end-2 inline-flex overflow-hidden justify-center items-end text-sm text-gray-500">
        {sender.lastMsg.timestamp}
      </div>
      <div className="col-start-11 col-end-13 row-start-2 row-end-3 inline-flex overflow-hidden justify-center items-start">
        <Chip size="sm" className="bg-recruitBlue text-whiteText">
          {sender.unreadCount}
        </Chip>
      </div>
    </div>
  );
}

export default ChatUser;
