import type { NextPage } from "next";
import {UserCard} from "@/components/admin/manageModarators/userCard";

const ManageModerators: NextPage = () => {
  return <>
    <div>
      <h2>Moderators</h2>
      <UserCard/>
    </div>
    </>;
};

export default ManageModerators;
