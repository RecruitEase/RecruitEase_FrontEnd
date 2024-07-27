import { Title } from "chart.js";
import React from "react";

interface Row {
  id: number;
  name: string;
  email: string;
  value: string;
  image: string;
}

interface Table2Props {
  Title: string;
  Rows: Row[];
}

export default function Table2({ Title, Rows }: Table2Props) {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {Title}
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {Rows.map((Row) => (
            <li key={Row.id} className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={Row.image}
                    alt={`${Row.name} image`}
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {Row.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {Row.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {Row.value}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
