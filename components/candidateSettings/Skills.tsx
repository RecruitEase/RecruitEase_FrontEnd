"use client";
import React, {useEffect, useState} from "react";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import {useSession} from "next-auth/react";
import {useCandidate, useUpdateCandidate} from "@/lib/hooks/useCandidates";
import {Bounce, toast} from "react-toastify";
import {toTitleCase} from "@/lib/utils";

const Skills: React.FC = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);


  const {data:session}=useSession();

  const candidateQuery=useCandidate(session?.user.roleDetails.candidateId)

  useEffect(() => {
    if(candidateQuery.isSuccess && candidateQuery.data!.skills!=null) {
      try {
        const arr:string[]=JSON.parse(candidateQuery.data!.skills||"")
        if(arr.length>0) setSkills(arr)
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
    console.log(skills)
    useUpdateCandidateQuery.mutate({
      req:{
        skills:JSON.stringify(skills)
      },
      candidateId:session?.user.roleDetails.candidateId
    })
  }

  const handleAddSkill = () => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, toTitleCase(skill)]);
      setSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Skills</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="max-w-md mx-auto p-4">
            <div className="mb-4">
              <div className="flex flex-row items-center justify-between gap-4">
                <Input
                    isRequired
                    type="text"
                    label="Add Skill"
                    className="max-w-xs"
                    value={skill}
                    onValueChange={setSkill}
                />

                <Button color="primary" onClick={handleAddSkill}>
                  Add Skill
                </Button>
              </div>
            </div>
            <div>
              <Card className="w-full">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">My Skills</p>
                  </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800"
                        >
                        {skill}
                          <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
            <button
                onClick={handleSave}
                className="text-white mt-5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
