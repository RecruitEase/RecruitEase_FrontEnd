"use client";
import React, { useState, useEffect, useRef } from "react";
import { Chip } from "@nextui-org/chip";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import SocialMediaBar from "./SocialMediaBar";


export default function ProfileCard({ data }: { data: any }) {

  const companyImage = (data.profilePic) ? process.env.NEXT_PUBLIC_S3_URL + data.profilePic : "/profileImages/noImage.png";

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          ref={buttonRef}
          onClick={toggleDropdown}
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        {dropdownVisible && (
          <div
            id="dropdown"
            ref={dropdownRef}
            className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-2"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-lg shadow-lg"
          src={companyImage}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {data.companyName}
        </h5>
        <div className="flex gap-4">
          <Chip color="default" startContent={<FaLocationDot />}>
            {data.city}
          </Chip>
          {/* <Chip color="default" startContent={<MdOutlinePeopleAlt />}>
            10K+ Employees
          </Chip> */}
        </div>
        <div className="flex gap-4">
          <SocialMediaBar />
        </div>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        <div className="flex p-4 text-gray-900 dark:text-gray-100">
          {data.companyName} is a forward-thinking organization dedicated to delivering exceptional value to its clients, stakeholders, and community.We operate at the intersection of innovation and customer-centricity, focusing on solving complex challenges and driving sustainable growth.
          With a robust portfolio of products and services, {data.companyName} is committed to excellence in quality, reliability, and innovation. Our diverse team of professionals brings a wealth of expertise, ensuring we consistently exceed expectations and remain a trusted partner in the industry.
        </div>
      </div>
    </div>
  );
}
