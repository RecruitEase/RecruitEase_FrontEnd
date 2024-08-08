import React from "react";

export default function ProfileComponent() {
  return (
    <div className="w-full max-w-sm mx-auto bg-white">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center p-4">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          alt="Profile image"
        />
        <div className="flex flex-col w-full gap-2 mt-4">
          <button
            type="button"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Change picture
          </button>
          <button
            type="button"
            className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-900"
          >
            Delete picture
          </button>
        </div>
      </div>
    </div>
  );
}
