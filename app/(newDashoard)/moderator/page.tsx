"use client";
import Content from "@/components/moderator/dasboard/Content";
import HeaderBox from "@/components/dashboard/HeaderBox";
import React from "react";

export default function Dashboard() {
  return (
      <div>
          <header className="home-header">
              <HeaderBox
                  type="title"
                  title="Dashboard"
                  subtext="Insights and analytics of the system"
              />
          </header>
          <Content/>
      </div>
  );
}
