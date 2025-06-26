export interface TeamMember {
  id: string;
  role: string;
  expertise: string[];
  experience: string;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'inProgress' | 'completed';
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  recipientId: string;
  read: boolean;
  createdAt: string;
}