/*
  # Fix Team Members RLS Policies

  1. Changes
    - Drop existing policies on team_members table
    - Create new policies that properly handle profile creation and management
    - Ensure team members can create and manage their own profiles
    - Maintain admin access to all profiles

  2. Security
    - Maintain RLS protection
    - Allow authenticated users to create their own profile
    - Allow users to update their own profile
    - Allow admins to manage all profiles
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Team members can read all profiles" ON team_members;
DROP POLICY IF EXISTS "Team members can update own profile" ON team_members;
DROP POLICY IF EXISTS "Admins can manage team members" ON team_members;

-- Create new policies
CREATE POLICY "Team members can create own profile"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

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
      SELECT 1
      FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );