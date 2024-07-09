import React from "react";
import StatCard from "@/components/recruiter/StatCard";

const stats = [
  { title: "Total Applications", value: "120" },
  { title: "Open rate", value: "12.5%" },
  { title: "Open rate of filtered applications ", value: "35.5%" },
  { title: "Time to hire", value: "540" },
];



export default function Dashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="mt-6">
        <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
          <div class=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
     
          <div class="flex flex-col">
              <label for="jobs" class="text-stone-600 text-sm font-medium">
                Jobs
              </label>

              <select
                id="status"
                class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>All</option>
           
              </select>
            </div>


            <div class="flex flex-col">
              <label for="from" class="text-stone-600 text-sm font-medium">
                From
              </label>
              <input
                type="date"
                id="from"
                class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>


            <div class="flex flex-col">
              <label for="to" class="text-stone-600 text-sm font-medium">
                To
              </label>
              <input
                type="date"
                id="to"
                class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>


            <div class="flex flex-col">
              <div class="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button class="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </div>
  );
}
