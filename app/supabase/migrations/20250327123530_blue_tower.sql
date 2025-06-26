/*
  # Initial Schema Setup for Aakkai Platform

  1. Tables
    - user_roles: Stores user role information
    - team_members: Stores team member profiles
    - projects: Stores project information
    - inquiries: Stores contact form submissions
    - notifications: Stores system notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'team_member')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  role text NOT NULL,
  expertise text[] NOT NULL DEFAULT '{}',
  experience text NOT NULL,
  image_url text,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can read all profiles"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Team members can update own profile"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage team members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create inquiries"
  ON inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view and manage inquiries"
  ON inquiries
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  recipient_id uuid REFERENCES auth.users NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = recipient_id);

CREATE POLICY "Admins can create notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );