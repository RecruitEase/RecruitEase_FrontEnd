
import RecruiterNavbar from "@/components/recruiter/RecruiterNavbar";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <RecruiterNavbar>
        <div className="flex flex-col w-full h-full">
          {children}
        </div>
      </RecruiterNavbar>
    
  );
}

