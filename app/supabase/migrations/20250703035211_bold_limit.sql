/*
  # Fix member_projects RLS Policy

  1. Changes
    - Enable Row Level Security on member_projects table
    - Drop existing conflicting policy
    - Create universal policy for all operations in development

  2. Security
    - Allow all operations (SELECT, INSERT, UPDATE, DELETE) for authenticated users
    - Use USING (true) to bypass all restrictions for development
*/

-- Enable Row Level Security on member_projects table
ALTER TABLE member_projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow all operations for dev" ON member_projects;

-- Create policy to allow ALL operations for development
CREATE POLICY "Allow all operations for dev"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);