/*
  # Add development policy for member_projects table

  1. Security Changes
    - Add a permissive policy for all operations on member_projects table
    - This allows full access during development phase
    
  2. Notes
    - This policy should be replaced with more restrictive policies in production
    - The policy uses `true` condition to allow all operations for any authenticated user
*/

-- Add development policy for member_projects
CREATE POLICY "Allow all operations for dev"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);