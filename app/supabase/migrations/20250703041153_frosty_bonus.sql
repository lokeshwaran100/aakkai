/*
  # Fix member_projects RLS policy

  1. Changes
    - Drop all existing policies on member_projects table
    - Recreate RLS policy to allow all operations for authenticated users
    - Ensure proper permissions for development

  2. Security
    - Enable RLS on member_projects table
    - Allow all operations for authenticated users during development
*/

-- Ensure RLS is enabled
ALTER TABLE member_projects ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start completely fresh
DROP POLICY IF EXISTS "Allow all operations for dev" ON member_projects;
DROP POLICY IF EXISTS "Team members can manage own projects" ON member_projects;
DROP POLICY IF EXISTS "Admins can view all member projects" ON member_projects;
DROP POLICY IF EXISTS "Team members can create own projects" ON member_projects;

-- Create a comprehensive policy that allows all operations
CREATE POLICY "Allow all operations for dev"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Grant necessary permissions to authenticated role
GRANT ALL ON member_projects TO authenticated;
GRANT USAGE ON SEQUENCE member_projects_id_seq TO authenticated;