import react, {useEffect, useState} from "react";
import { Input, Textarea } from "@nextui-org/react";
import Tbl from "./Tbl";
import { Card, CardBody } from "@nextui-org/react";
import {useSession} from "next-auth/react";
import {useCandidate, useUpdateCandidate} from "@/lib/hooks/useCandidates";
import {Bounce, toast} from "react-toastify";
import {Education} from "@/types/users";



const qColumns = [
  {
    key: "school",
    name: "School",
  },
  {
    key: "degree",
    name: "Degree",
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
    key: "fieldOfStudy",
    name: "Field of Study",
    sortable: false,
  },
  {
    key: "actions",
    name: "Actions",
  },

];

export default function Education() {

  const [school,setSchool]=useState("")
  const [degree,setDegree]=useState("")
  const [startDate,setStartDate]=useState("")
  const [endDate,setEndDate]=useState("")
  const [fieldOfStudy,setFieldOfStudy]=useState("")
  const [education,setEducation]=useState<Education[]>([
  ])


  const {data:session}=useSession();

  const candidateQuery=useCandidate(session?.user.roleDetails.candidateId)

  useEffect(() => {
    if(candidateQuery.isSuccess && candidateQuery.data!.education!=null) {
      try {
        const arr:Education[]=JSON.parse(candidateQuery.data!.education||"")
        if(arr.length>0) setEducation(arr)

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
        education:JSON.stringify(education)
      },
      candidateId:session?.user.roleDetails.candidateId
    })

  }


  const handleNew=()=>{
    if (school && degree && startDate && endDate && fieldOfStudy ) {
      setEducation([...education, {school,degree,startDate,endDate,fieldOfStudy}]);
      setSchool("");
      setDegree("");
      setStartDate("");
      setEndDate("");
      setFieldOfStudy("");
    }

  }

  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Education</h2>
        <div className="grid  mx-auto mt-8">
          <Card>
            <CardBody>
              {(education.length!=0)?
              <Tbl columns={qColumns} rows={education} setEducation={setEducation}/>
                  :<>No Education History!</>
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
                    label="School / Institute"
                    value={school}
                    onValueChange={setSchool}
                    className="max-w-xs"
                />
              </div>
              <div className="w-full">
                <Input
                    isRequired
                    type="text"
                    label="Degree / Course"
                    value={degree}
                    onValueChange={setDegree}
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

            <div className="mb-2 sm:mb-6">
              <Input
                  isRequired
                  type="text"
                  label="Field of Study"
                  value={fieldOfStudy}
                  onValueChange={setFieldOfStudy}
                  className="max-w-xs"
              />
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
