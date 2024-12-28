export interface Project {
  id: string;
  title: string;
  image: string;
  client: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  deliverables: string[];
  status: "in-progress" | "completed" | "on-hold";
  deadline: string;
}
