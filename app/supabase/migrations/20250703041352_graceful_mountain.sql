/*
  # Fix Member Projects RLS Policy

  1. Security Updates
    - Drop existing overly permissive policy
    - Add proper policies for team members to manage their own projects
    - Allow INSERT, UPDATE, DELETE, and SELECT operations for authenticated users on their own projects

  2. Policy Logic
    - Team members can only access projects where member_id matches their team_members.id
    - Uses JOIN with team_members table to verify ownership through user_id
*/

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Allow all operations for dev" ON member_projects;

-- Create proper RLS policies for member_projects
CREATE POLICY "Team members can view own projects"
  ON member_projects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.id = member_projects.member_id 
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can insert own projects"
  ON member_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.id = member_projects.member_id 
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can update own projects"
  ON member_projects
  FOR UPDATE
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

CREATE POLICY "Team members can delete own projects"
  ON member_projects
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.id = member_projects.member_id 
      AND team_members.user_id = auth.uid()
    )
  );

-- Also add a policy for admins to manage all projects
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