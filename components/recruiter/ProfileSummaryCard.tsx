import React from "react";
export default function ProfileSummaryCard() {
  return (
    <div className=" h-fit w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 mt-5">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Sajith Bandara
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          sajithbandara@gamil.com
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Colombo, Sri Lanka
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
