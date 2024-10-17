import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useRouter } from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";

export const UserDropdown = () => {
  const router = useRouter();

  //for user session state
  const { data: session } = useSession();
  console.log({ session });

  const user=session?.user;
 // console.log("cdcdfcfdcfdcfdcd",user)
  const userProfilePic=(user?.roleDetails.profilePic!=null)?process.env.NEXT_PUBLIC_S3_URL+user?.roleDetails.profilePic : "/profileImages/noImage.png";
  const isLoggedIn=!!session?.user
  const avatarItems = isLoggedIn?[
    {label:"signin",url:`/`},
    {label:"Dashboard",url:`/${user?.role}`},
    {label:"Profile",url:`/${user?.role}/profile`},
    {label:"Settings",url:`/${user?.role}/settings`},
    {label:"Chats",url:"/chats"},
    {label:"logout",url:"/logout"},
  ]:[];

  return (
    <>
      {!isLoggedIn ? (<>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signin" variant="flat">
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
      ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user?.roleDetails.firstName+" "+user?.roleDetails.lastName}
                  size="sm"
                  src={userProfilePic}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">


              {avatarItems.map((item, index) => {
                if (index == avatarItems.length - 1) {
                  return (
                      <DropdownItem key={"logout-key"} color={"danger"} onClick={()=>signOut()}>
                        Log Out
                      </DropdownItem>
                  )
                } else if (index == 0) {
                  return (
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{user?.email}</p>
                      </DropdownItem>

                  )
                } else {
                  return (
                      <DropdownItem key={`${item.label}-${index}`} href={item.url}>
                        {item.label}
                      </DropdownItem>
                  )
                }
              })}


            </DropdownMenu>
          </Dropdown>
      )}
    </>
  );
};
