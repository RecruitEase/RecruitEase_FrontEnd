"use client";
import React, { useState } from "react";
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

const Skills: React.FC = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([
    "English",
    "Engineering",
    "Communication",
    "Project Management",
    "Research Skills",
    "Presentations",
    "Strategy",
    "Leadership",
    "Microsoft Excel",
    "Customer Service",
  ]);

  const handleAddSkill = () => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
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
                  onChange={(e) => setSkill(e.target.value)}
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
                <Divider />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
