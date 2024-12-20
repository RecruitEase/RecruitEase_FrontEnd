import { ChatMsgProp } from '@/types'
import React from 'react'
import { Avatar } from '@nextui-org/react'
function ChatMsg({sender,msg,isSenderLoggedUser=false}:ChatMsgProp) {
  return (
    <div className={`flex gap-3 ${isSenderLoggedUser ? 'flex-row-reverse' : ''}`} >
            <div  className="relative flex-none">
            <Avatar src={sender.img} size="sm" />
                
                    </div>
                    <div className="flex  max-w-[70%] flex-col gap-4">
                        <div className="relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600">
                            <div className="flex">
                                <div className="w-full text-small font-semibold text-default-foreground">
                                    {sender.name}
                                    </div>
                                    <div className="flex-end text-small text-default-400">
                                        {msg.timestamp}
                                        </div>
                                        </div>
                                        <div className="mt-2 text-small text-default-900">
                                            {msg.content}
                                            {msg.img &&(
                                              <div>
                                                <img src={msg.img} className="w-full h-auto object-cover mt-2" />
                                              </div>

                                            )}
                                            </div>
                                            </div>
                                            </div>
        </div>
  )
}

export default ChatMsg