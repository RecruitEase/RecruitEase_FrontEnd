import type { NextPage } from "next";
import {UserCard} from "@/components/admin/manageModarators/userCard";
import HeaderBox from "@/components/dashboard/HeaderBox";
import React from "react";
import {Button} from "@nextui-org/button";

const data =[
  {
    name:"Sajith Bandara",
    email:"sajithbandara@gmail.com",
    imageUrl:"https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status:"Active"
  },
  {
    name:"Sajith Bandara",
    email:"sajithbandara@gmail.com",
    imageUrl:"https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status:"Active"
  },
  {
    name:"Sajith Bandara",
    email:"sajithbandara@gmail.com",
    imageUrl:"https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status:"Active"
  },
  {
    name:"Sajith Bandara",
    email:"sajithbandara@gmail.com",
    imageUrl:"https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status:"Active"
  },
  {
    name:"Sajith Bandara",
    email:"sajithbandara@gmail.com",
    imageUrl:"https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status:"Active"
  },
  {
    name:"Sajith Bandara",
    email:"sajithbandara@gmail.com",
    imageUrl:"https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status:"Active"
  },
  {
    name:"Sajith Bandara",
    email:"sajithbandara@gmail.com",
    imageUrl:"https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status:"Active"
  }
]

const ManageModerators: NextPage = () => {
  return (
      <div>
        <header className="home-header">
          <HeaderBox
              type="title"
              title="Manage Moderators"
              subtext="Add and manage moderators to system from here."
          />
        </header>
        <div className={"flex justify-end mb-4"}>
          <Button className={"bg-recruitBlue text-[#FFFFFF]"}>ADD NEW</Button>
        </div>
        <div className={"flex sm:flex-row flex-col gap-4 flex-wrap"}>

          {data && data.map((item) => (
              <UserCard user={item}/>

          ))}
        </div>
      </div>
  )
};

export default ManageModerators;
