import  {useEffect, useState} from "react";
import { Input } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import {useSession} from "next-auth/react";
import {useCandidate, useUpdateCandidate} from "@/lib/hooks/useCandidates";
import {Bounce, toast} from "react-toastify";
import {Experience} from "@/types/users";
import TblExp from "./TblExp";



const qColumns = [
  {
    key: "company",
    name: "Company",
  },
  {
    key: "position",
    name: "Position",
    sortable: false,
  },

  {
    key: "startDate",
    name: "Start Date",
    sortable: false,
  },
  {
    key: "endDate",
    name: "End Date",
    sortable: false,
  },
  {
    key: "actions",
    name: "Actions",
  },

];

export default function Experiences() {

  const [company,setCompany]=useState("")
  const [position,setPosition]=useState("")
  const [startDate,setStartDate]=useState("")
  const [endDate,setEndDate]=useState("")
  const [experience,setExperience]=useState<Experience[]>([
  ])


  const {data:session}=useSession();

  const candidateQuery=useCandidate(session?.user.roleDetails.candidateId)

  useEffect(() => {
    if(candidateQuery.isSuccess && candidateQuery.data!.experience!=null) {
      try {
        const arr:Experience[]=JSON.parse(candidateQuery.data!.experience||"")
        if(arr.length>0) setExperience(arr)

      }catch (e){
        toast.error('Error Occurred!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }

    }
  }, [candidateQuery.data]);

  const useUpdateCandidateQuery=useUpdateCandidate();


  const handleSave=()=>{
    useUpdateCandidateQuery.mutate({
      req:{
        experience:JSON.stringify(experience)
      },
      candidateId:session?.user.roleDetails.candidateId
    })

  }


  const handleNew=()=>{
    if (company && position && startDate && endDate ) {
      setExperience([...experience, {company,position,startDate,endDate}]);
      setCompany("");
      setPosition("");
      setStartDate("");
      setEndDate("");
    }

  }

  return (
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Experience</h2>
          <div className="grid  mx-auto mt-8">
            <Card>
              <CardBody>
                {(experience.length!=0)?
                    <TblExp columns={qColumns} rows={experience} setExperience={setExperience}/>
                    :<>No Experience History!</>
                }
              </CardBody>
            </Card>

            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">Add New</h2>
              <div
                  className="flex flex-col items-center w-full mt-4 mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <Input
                      isRequired
                      type="text"
                      label="Company / Institute"
                      value={company}
                      onValueChange={setCompany}
                      className="max-w-xs"
                  />
                </div>
                <div className="w-full">
                  <Input
                      isRequired
                      type="text"
                      label="Position"
                      value={position}
                      onValueChange={setPosition}
                      className="max-w-xs"
                  />
                </div>
              </div>

              <div
                  className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <Input
                      isRequired
                      type="date"
                      label="Start Date"
                      value={startDate}
                      onValueChange={setStartDate}
                      className="max-w-xs"
                  />
                </div>
                <div className="w-full">
                  <Input
                      isRequired
                      type="date"
                      label="End Date"
                      value={endDate}
                      onValueChange={setEndDate}
                      className="max-w-xs"
                  />
                </div>
              </div>


              <button
                  type="submit"
                  className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  onClick={handleNew}
              >
                Add New
              </button>

              <div className="flex justify-end">
                <button
                    type="submit"
                    className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
