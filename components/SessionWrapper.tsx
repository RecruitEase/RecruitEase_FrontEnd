"use client";
import { useSession } from "next-auth/react";
import LoadingComponent from "./LoadingComponent";

const SessionWrapper = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingComponent />; // Or a custom loading component
  }

  return <>{children}</>;
};

export default SessionWrapper;
