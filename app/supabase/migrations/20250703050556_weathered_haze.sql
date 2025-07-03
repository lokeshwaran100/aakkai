/*
  # Consolidate to member_projects table only

  1. Changes
    - Drop the old projects table
    - Update Work page and Admin dashboard to use member_projects
    - Ensure proper RLS policies for member_projects

  2. Security
    - Team members can only access their own projects
    - Admins can access all projects
    - Public can view projects for the Work page
*/

-- Drop the old projects table since we're using member_projects now
DROP TABLE IF EXISTS projects CASCADE;

-- Ensure member_projects has proper RLS policies
ALTER TABLE member_projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Allow all operations for dev" ON member_projects;
DROP POLICY IF EXISTS "Team members can view own projects" ON member_projects;
DROP POLICY IF EXISTS "Team members can insert own projects" ON member_projects;
DROP POLICY IF EXISTS "Team members can update own projects" ON member_projects;
DROP POLICY IF EXISTS "Team members can delete own projects" ON member_projects;
DROP POLICY IF EXISTS "Admins can manage all projects" ON member_projects;

-- Policy for public to view all projects (for Work page)
CREATE POLICY "Anyone can view projects"
  ON member_projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy for team members to manage only their own projects
CREATE POLICY "Team members can manage own projects"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.id = member_projects.member_id 
      AND team_members.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.id = member_projects.member_id 
      AND team_members.user_id = auth.uid()
    )
  );

-- Policy for admins to manage all projects
CREATE POLICY "Admins can manage all projects"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  );