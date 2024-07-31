"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Education from "./Education";
import Public from "./Public";
import Skills from "./Skills";
import Experiences from "./Experiences";

export default function App() {
  const [activeComponent, setActiveComponent] = useState("Public");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Experiences":
        return <Experiences />;
      case "Education":
        return <Education />;
      case "Skills":
        return <Skills />;
      case "Public":
        return <Public />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full flex flex-col gap-5 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <a
            href="#"
            className={`flex items-center px-3 py-2.5 ${
              activeComponent === "Public"
                ? "font-bold border rounded-full"
                : "font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }`}
            onClick={() => setActiveComponent("Public")}
          >
            Public Profile
          </a>
          <a
            href="#"
            className={`flex items-center px-3 py-2.5  ${
              activeComponent === "Skills"
                ? "font-bold border rounded-full"
                : "font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }`}
            onClick={() => setActiveComponent("Skills")}
          >
            Skills
          </a>
          <a
            href="#"
            className={`flex items-center px-3 py-2.5  ${
              activeComponent === "Experiences"
                ? "font-bold border rounded-full"
                : "font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }`}
            onClick={() => setActiveComponent("Experiences")}
          >
            Experience
          </a>
          <a
            href="#"
            className={`flex items-center px-3 py-2.5  ${
              activeComponent === "Education"
                ? "font-bold border rounded-full"
                : "font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }`}
            onClick={() => setActiveComponent("Education")}
          >
            Education
          </a>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        {renderComponent()}
      </main>
    </div>
  );
}
