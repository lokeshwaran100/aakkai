/*
  # Fix team_members INSERT policy

  1. Security Changes
    - Update the INSERT policy for team_members table
    - Ensure users can only create profiles for themselves
    - Fix the with_check condition to validate user_id matches auth.uid()

  This resolves the RLS policy violation when team members try to create their initial profile.
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Team members can create own profile" ON team_members;

-- Create a new INSERT policy with proper user_id validation
CREATE POLICY "Team members can create own profile"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);