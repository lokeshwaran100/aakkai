/*
  # Enable RLS and Universal Policy for team_members

  1. Changes
    - Enable Row Level Security on team_members table
    - Add universal policy allowing all operations for development

  2. Security
    - RLS is enabled but policy allows all operations
    - Suitable for development environment
*/

-- Enable Row Level Security on team_members table
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Universal access for authenticated users" ON team_members;
DROP POLICY IF EXISTS "Team members can create own profile" ON team_members;
DROP POLICY IF EXISTS "Team members can read all profiles" ON team_members;
DROP POLICY IF EXISTS "Team members can update own profile" ON team_members;
DROP POLICY IF EXISTS "Admins can manage team members" ON team_members;

-- Add the universal policy that allows all operations
CREATE POLICY "Allow all operations for dev"
  ON team_members
  FOR ALL
  USING (true);