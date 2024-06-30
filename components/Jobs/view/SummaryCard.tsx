import React from "react";
import { FiMapPin, FiClock, FiBriefcase, FiBookmark } from "react-icons/fi";

const SummaryCard = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full py-20 flex flex-wrap justify-center items-center gap-2">
        <div className="w-[20rem] mx-auto flex flex-col gap-2 px-4 border border-gray-300 border-gray-300 rounded-lg bg-greybg">
          <div className="w-full flex justify-center items-center">
            <img
              className="w-[8rem] h-[8rem] rounded-lg outline outline-offset-2 outline-1 outline-blue-400 shadow-lg relative -top-[2rem]"
              src="https://image-service-cdn.seek.com.au/903000dee27013187498cbc7d98ca876a58951ff/f3c5292cec0e05e4272d9bf9146f390d366481d0"
              alt="Profile Image"
            />
          </div>

          <div >

          <h2 className="text-xl font-semibold text-primaryText">
            Medical Marketing Executive (Male/Female)
          </h2>
          <p className="text-secondaryText">
            MIOT Hospital Information Centre Srilanka
          </p>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiMapPin className="mr-2" />
            <p>Colombo, Western Province</p>
          </div>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiClock className="mr-2" />
            <p>8 days left</p>
          </div>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiBriefcase className="mr-2" />
            <p>Full Time</p>
          </div>
          <hr className="h-px bg-graybg"></hr>
          <div className="mt-4">
            <p className="text-tertiaryText">
              2-3 years of relevant experience. Please refer to the job advert
              for further information.
            </p>
            <div className="mt-2 text-secondaryText">
              <p>
                <strong>Education:</strong> Bachelor's Degree
              </p>
              <p>
                <strong>Experience:</strong> 2-3 years
              </p>
              <p>
                <strong>Salary Range:</strong> Any
              </p>
            </div>
          </div>
    
          </div>

          <div className="p-4  border-t">
            <button className="w-full bg-green-500 text-white py-2 rounded">
              Apply for Job
            </button>
            <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Save Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
