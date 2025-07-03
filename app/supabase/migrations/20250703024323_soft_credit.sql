/*
  # Fix team members INSERT policy

  1. Policy Changes
    - Update the INSERT policy for team_members table to properly handle profile creation
    - The current policy prevents insertion when user_id is NULL, but the trigger sets it after RLS check
    - New policy allows authenticated users to insert profiles that will be associated with their user ID

  2. Security
    - Maintains security by ensuring users can only create profiles for themselves
    - Works with the existing trigger that sets user_id automatically
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Team members can create own profile" ON team_members;

-- Create a new INSERT policy that works with the trigger
CREATE POLICY "Team members can create own profile"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Update the trigger function to ensure it properly sets the user_id
CREATE OR REPLACE FUNCTION set_team_member_user_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Set user_id to the current authenticated user if not already set
  IF NEW.user_id IS NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  
  -- Ensure the user_id matches the authenticated user (security check)
  IF NEW.user_id != auth.uid() THEN
    RAISE EXCEPTION 'Cannot create profile for another user';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;