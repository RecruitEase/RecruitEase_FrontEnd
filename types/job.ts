export interface Job {
  id: string;
    title: string;
    type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "TEMPORARY" | "INTERNSHIP"; // Enum types for job types
    location: string;
    field: string;
    experienceLevel: string;
    educationalLevel: string;
    description: string;
    overview: string;
    deadline: Date;
    status: "OPEN" | "CLOSED"; // Enum types for job status
    recruiterId: string;
    imageUrl: string;
  }

  