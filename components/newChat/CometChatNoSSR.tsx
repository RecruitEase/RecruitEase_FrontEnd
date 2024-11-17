import {useEffect, useState} from "react";
import {UIKitSettingsBuilder} from "@cometchat/uikit-shared";
import {CometChatConversationsWithMessages, CometChatUIKit} from "@cometchat/chat-uikit-react";
import {useSession} from "next-auth/react";


const COMETCHAT_CONSTANTS = {
    APP_ID: process.env.NEXT_PUBLIC_CHAT_APP_ID, //Replace with your App ID
    REGION: process.env.NEXT_PUBLIC_CHAT_REGION, //Replace with your App Region
    AUTH_KEY: process.env.NEXT_PUBLIC_CHAT_AUTH_KEY, //Replace with your Auth Key or leave blank if you are authenticating using Auth Token
};


function CometChatNoSSR() {
    const [user, setUser] = useState(undefined);

    const { data: session } = useSession();

    const userx=session!.user;
    //create user
    const uid=userx.id;
    const name=userx.roleDetails.firstName+" "+userx.roleDetails.lastName;


    useEffect(() => {
        window.CometChat = require("@cometchat/chat-sdk-javascript").CometChat;

      const UIKitSettings = new UIKitSettingsBuilder()
          .setAppId(COMETCHAT_CONSTANTS.APP_ID)
          .setRegion(COMETCHAT_CONSTANTS.REGION)
          .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
          .subscribePresenceForAllUsers()
          .build();

    CometChatUIKit.init(UIKitSettings)
        .then(() => {
            console.log("Initialization completed successfully");
            CometChatUIKit.getLoggedinUser().then((user) => {
                if (!user) {
                    CometChatUIKit.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY)
                        .then((user) => {
                            console.log("Login Successful", { user });
                            setUser(user);
                        })
                        .catch((error) => {}, console.log);
                } else {
                    console.log("Already logged-in", { user });
                    setUser(user);
                }
            });
        })
        .catch((e) => {
            console.log(e);
        });

        // CometChat.getUser("cometchat-uid-1",COMETCHAT_CONSTANTS.AUTH_KEY).then(
        //     (usery: CometChat.User) => {
        //         console.log("User details fetched for user:", usery);
        //     }, (error: CometChat.CometChatException) => {
        //         console.log("User details fetching failed with error:", error);
        //     }
        // );


  }, []);

    // var chatUser=new CometChat.User("cometchat-uid-1",COMETCHAT_CONSTANTS.AUTH_KEY)

  return user ? <div style={{width: "100%", height: "90vh"}}>
      <div style={{height: "100%", width: "100%"}}>
          <CometChatConversationsWithMessages />
      </div>
  </div> : (
      <div>Loading...</div>
  );
}

export default CometChatNoSSR;