export interface Job {
    jobId?: string;
    title: string;
    type: "full_time" | "part_time" | "contract" | "other"; // Enum types for job types
    location: string;
    fields: Field[] | number[];
    experienceLevel: number;
    educationLevel: number;
    description: string;
    overview: string;
    deadline: string;
    questions?:string | null;
    status?: "FILLED" | "LIVE" | "UNPUBLISHED" | "ARCHIVED"; // Enum types for job status
    recruiterId?: string;
    imageUrl?: string;
    createdAt?: string;
  }

export interface Field{
  key:number;
  label:string
}

export interface MCQProp{
    question:string;
    options:string[];
    correctAnswer:number
}