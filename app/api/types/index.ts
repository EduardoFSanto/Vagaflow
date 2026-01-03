// app/types/index.ts
export interface JobApplication {
  jobId: number;
  name: string;
  email: string;
  message?: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
}
