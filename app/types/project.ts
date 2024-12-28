export interface Project {
  id: string;
  title: string;
  image: string;
  client: string;
  status: "in-progress" | "completed" | "on-hold";
  deadline: string;
}
