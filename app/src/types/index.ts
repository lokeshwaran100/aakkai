export interface TeamMember {
  id: string;
  user_id?: string;
  role: string;
  expertise: string[];
  experience: string;
  image_url?: string;
  is_available: boolean;
  projects_collaborated: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  tags: string[];
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  service?: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed';
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  recipient_id: string;
  read: boolean;
  created_at: string;
}