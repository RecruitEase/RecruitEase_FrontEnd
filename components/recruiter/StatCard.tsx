import React from "react";

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard = ({ title, value }: StatCardProps) => {
    return (
      <div className="p-4 mt-5 bg-white shadow-md rounded-lg">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-800">{value}</p>
      </div>
    );
  };

  export default StatCard;