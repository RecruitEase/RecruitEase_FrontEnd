import react from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import Tbl from "./Tbl";
import { qColumns, qualificationData } from "./data";
import { Card, CardBody } from "@nextui-org/react";

export default function Education() {
  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Education</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <Card>
            <CardBody>
              <Tbl columns={qColumns} rows={qualificationData} />
            </CardBody>
          </Card>

          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Add New</h2>
            <div className="flex flex-col items-center w-full mt-4 mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <Input
                  isRequired
                  type="text"
                  label="School"
                  className="max-w-xs"
                />
              </div>
              <div className="w-full">
                <Input
                  isRequired
                  type="text"
                  label="Degree"
                  className="max-w-xs"
                />
              </div>
            </div>

            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <Input
                  isRequired
                  type="date"
                  label="Start Date"
                  className="max-w-xs"
                />
              </div>
              <div className="w-full">
                <Input
                  isRequired
                  type="date"
                  label="End Date"
                  className="max-w-xs"
                />
              </div>
            </div>

            <div className="mb-2 sm:mb-6">
              <Input
                isRequired
                type="text"
                label="Field of Study"
                className="max-w-xs"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
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
