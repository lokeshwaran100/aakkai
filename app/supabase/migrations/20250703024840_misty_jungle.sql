/*
  # Enable RLS and Universal Policy for team_members

  1. Changes
    - Enable Row Level Security on team_members table
    - Drop all existing policies
    - Add a universal policy that allows all operations for authenticated users

  2. Security
    - RLS is enabled but with a permissive universal policy
    - All authenticated users can perform any operation on team_members
*/

-- Enable Row Level Security on team_members table
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies on team_members table
DROP POLICY IF EXISTS "Team members can create own profile" ON team_members;
DROP POLICY IF EXISTS "Team members can read all profiles" ON team_members;
DROP POLICY IF EXISTS "Team members can update own profile" ON team_members;
DROP POLICY IF EXISTS "Admins can manage team members" ON team_members;

-- Add universal policy that allows all operations for authenticated users
CREATE POLICY "Universal access for authenticated users"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);