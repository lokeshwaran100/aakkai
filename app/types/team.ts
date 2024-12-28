export interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string;
  email: string;
  status: "active" | "inactive";
}

export interface Profile {
  name: string;
  role: string;
  email: string;
  bio: string;
  skills: string[];
}
