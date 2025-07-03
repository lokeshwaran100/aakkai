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
  user_email?: string; // Add this field to store the actual email
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  tags: string[];
  created_at: string;
}

export interface MemberProject {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  tags: string[];
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  start_date?: string;
  end_date?: string;
  member_id: string;
  created_at: string;
  pdf_url?: string;
  pdf_filename?: string;
  category: string;
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

// Project categories
export const PROJECT_CATEGORIES = [
  'FMCG (Fast-Moving Consumer Goods)',
  'Food & Beverage / QSR (Quick Service Restaurants)',
  'Fashion & Lifestyle',
  'Health, Wellness & Fitness',
  'Real Estate & Home Interiors',
  'Others'
] as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[number];