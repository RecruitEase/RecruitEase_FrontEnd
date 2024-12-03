import React from "react";

interface Profile {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  name: string;
  address: string;
  city: string;
  gender: string;
  profilePic: string;
  status: string;
  candidateId: string;
  skills: string;
  aboutMe: string;
  experience: string;
  education: string;
}

interface ProfileSummaryCardProps {
  profile: Profile;
}

export default function ProfileSummaryCard({
  profile,
}: ProfileSummaryCardProps) {
  return (
    <div className="h-fit w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 mt-5">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={profile.profilePic}
          alt={`'s profile picture`}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {`${profile.name}`}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {profile.email}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {`${profile.city}, Sri Lanka`}
        </span>
        <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Status: {profile.status}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            href={`/recruiter/candidate-profile/${profile.candidateId}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
