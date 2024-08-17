"use client";
import { useSession } from "next-auth/react";

const SessionWrapper = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Or a custom loading component
  }

  return <>{children}</>;
};

export default SessionWrapper;
