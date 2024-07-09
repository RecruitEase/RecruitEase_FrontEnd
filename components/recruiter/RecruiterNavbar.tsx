"use client";
import React, { useEffect, useState, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FcStatistics } from "react-icons/fc";

type RecruiterNavbarProps = {
  children: React.ReactNode;
};

export default function RecruiterNavbar({ children }: RecruiterNavbarProps) {
  const [openNav, setOpenNav] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const maxSidebarRef = useRef<HTMLDivElement>(null);
  const miniSidebarRef = useRef<HTMLDivElement>(null);
  const maxToolbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current!;
    const maxSidebar = maxSidebarRef.current!;
    const miniSidebar = miniSidebarRef.current!;
    const maxToolbar = maxToolbarRef.current!;
    const logo = logoRef.current!;
    const content = contentRef.current!;

    if (openNav) {
      sidebar.classList.remove("-translate-x-48");
      sidebar.classList.add("translate-x-none");
      maxSidebar.classList.remove("hidden");
      maxSidebar.classList.add("flex");
      miniSidebar.classList.remove("flex");
      miniSidebar.classList.add("hidden");
      maxToolbar.classList.add("translate-x-0");
      maxToolbar.classList.remove("translate-x-24", "scale-x-0");
      logo.classList.remove("ml-12");
      content.classList.remove("ml-12");
      content.classList.add("ml-12", "md:ml-60");
    } else {
      sidebar.classList.add("-translate-x-48");
      sidebar.classList.remove("translate-x-none");
      maxSidebar.classList.add("hidden");
      maxSidebar.classList.remove("flex");
      miniSidebar.classList.add("flex");
      miniSidebar.classList.remove("hidden");
      maxToolbar.classList.add("translate-x-24", "scale-x-0");
      maxToolbar.classList.remove ("translate-x-0");
      logo.classList.add("ml-12");
      content.classList.remove("ml-12", "md:ml-60");
      content.classList.add("ml-12");
    }
  }, [openNav]);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="body bg-white dark:bg-[#0F172A]">
      <div className="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
        <div
          ref={logoRef}
          className="logo ml-12 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center"
        >
        RecruitEase
        </div>

        <div className="grow h-full flex items-center justify-center"></div>
        <div className="flex-none h-full text-center flex items-center justify-center">
          <div className="flex space-x-3 items-center px-3">
            <div className="flex-none flex justify-center">
              <div className="w-8 h-8 flex">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                  alt="profile"
                  className="shadow rounded-full object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block text-sm md:text-md text-black dark:text-white">
              ABC Company
            </div>
          </div>
        </div>
      </div>
      <aside
        ref={sidebarRef}
        className="w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]"
      >
        <div
          ref={maxToolbarRef}
          className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12"
        >
          <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1 text-white pr-2">
            <div>Recruit</div>
          </div>
          <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500 pl-2 pr-2 py-1 text-white">
            <div className="transform ease-in-out duration-300 mr-12">Ease</div>
          </div>
        </div>
        <div
          onClick={toggleNav}
          className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45"
        >
          <RxHamburgerMenu />
        </div>

        <div
          ref={maxSidebarRef}
          className="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]"
        >
          <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
            <FcStatistics />
              <div>Statistics</div>
            </a>
          </div>
        </div>

        <div
          ref={miniSidebarRef}
          className="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]"
        >
          <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
            <a href="/" className="flex items-center space-x-3">
            <FcStatistics />
            </a>
          </div>
        </div>
      </aside>

      <div
        ref={contentRef}
        className="content ml-12 transform ease-in-out duration-500 pt-10 px-2 md:px-5 pb-4"
      >
        {children}
      </div>
    </div>
  );
}
