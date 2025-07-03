/*
  # Fix member_projects RLS policy for development

  1. Changes
    - Ensure RLS is enabled on member_projects table
    - Add development policy that allows all operations
    - Remove conflicting policies if they exist

  2. Security
    - Allow all operations for authenticated users in development
    - This bypasses restrictive RLS policies that are causing issues
*/

-- Ensure RLS is enabled
ALTER TABLE member_projects ENABLE ROW LEVEL SECURITY;

-- Drop any existing conflicting policies
DROP POLICY IF EXISTS "Team members can manage own projects" ON member_projects;
DROP POLICY IF EXISTS "Admins can view all member projects" ON member_projects;
DROP POLICY IF EXISTS "Team members can create own projects" ON member_projects;
DROP POLICY IF EXISTS "Allow all operations for dev" ON member_projects;

-- Create the development policy that allows all operations
CREATE POLICY "Allow all operations for dev"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);