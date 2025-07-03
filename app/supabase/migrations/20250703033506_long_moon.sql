/*
  # Create member projects table

  1. New Tables
    - `member_projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text, optional)
      - `tags` (text array)
      - `status` (text with check constraint)
      - `start_date` (date, optional)
      - `end_date` (date, optional)
      - `member_id` (uuid, references team_members)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `member_projects` table
    - Add policies for team members to manage their own projects
    - Add policy for admins to view all projects
*/

-- Create member_projects table
CREATE TABLE IF NOT EXISTS member_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  tags text[] DEFAULT '{}',
  status text DEFAULT 'in_progress' CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold')),
  start_date date,
  end_date date,
  member_id uuid REFERENCES team_members(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE member_projects ENABLE ROW LEVEL SECURITY;

-- Policy for team members to manage their own projects
CREATE POLICY "Team members can manage own projects"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (
    member_id IN (
      SELECT id FROM team_members WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    member_id IN (
      SELECT id FROM team_members WHERE user_id = auth.uid()
    )
  );

-- Policy for admins to view all projects
CREATE POLICY "Admins can view all member projects"
  ON member_projects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Insert sample projects for existing team members
INSERT INTO member_projects (title, description, image_url, tags, status, start_date, end_date, member_id)
SELECT 
  'Brand Identity Redesign',
  'Complete brand identity redesign for a tech startup including logo, color palette, and brand guidelines.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80',
  ARRAY['Branding', 'Identity Design', 'Logo Design'],
  'completed',
  '2024-01-15'::date,
  '2024-03-20'::date,
  id
FROM team_members 
WHERE role = 'Creative Director'
LIMIT 1;

INSERT INTO member_projects (title, description, image_url, tags, status, start_date, member_id)
SELECT 
  'E-commerce Mobile App',
  'UI/UX design for a mobile e-commerce application with focus on user experience and conversion optimization.',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80',
  ARRAY['UI/UX Designing', 'Mobile App', 'E-commerce'],
  'in_progress',
  '2024-02-01'::date,
  id
FROM team_members 
WHERE role = 'Senior Designer'
LIMIT 1;

INSERT INTO member_projects (title, description, image_url, tags, status, start_date, end_date, member_id)
SELECT 
  'Healthcare Dashboard',
  'Dashboard design for healthcare professionals to manage patient data and appointments.',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
  ARRAY['UI/UX Designing', 'Dashboard', 'Healthcare'],
  'completed',
  '2023-11-10'::date,
  '2024-01-30'::date,
  id
FROM team_members 
WHERE role = 'Senior Designer'
LIMIT 1;