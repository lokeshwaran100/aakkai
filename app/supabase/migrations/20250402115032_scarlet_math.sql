/*
  # Fix team_members RLS and add user trigger

  1. Changes
    - Add trigger to automatically set user_id on team_members table
    - Update RLS policies to handle profile creation correctly
    - Add sample data for admin and team member users
    - Add user roles for admin and team member

  2. Security
    - Maintain RLS protection
    - Ensure users can only create/update their own profiles
    - Add proper role assignments
*/

-- Create function to set user_id automatically
CREATE OR REPLACE FUNCTION public.set_team_member_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to set user_id on insert
DROP TRIGGER IF EXISTS set_team_member_user_id_trigger ON team_members;
CREATE TRIGGER set_team_member_user_id_trigger
  BEFORE INSERT ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.set_team_member_user_id();

-- Drop existing policies
DROP POLICY IF EXISTS "Team members can create own profile" ON team_members;
DROP POLICY IF EXISTS "Team members can read all profiles" ON team_members;
DROP POLICY IF EXISTS "Team members can update own profile" ON team_members;
DROP POLICY IF EXISTS "Admins can manage team members" ON team_members;

-- Recreate policies with proper checks
CREATE POLICY "Team members can create own profile"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.uid() = user_id OR user_id IS NULL) AND
    NOT EXISTS (
      SELECT 1 FROM team_members 
      WHERE user_id = auth.uid()
    )
  );

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

-- Insert admin user role
INSERT INTO user_roles (user_id, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'team_member')
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample team member profiles
INSERT INTO team_members (user_id, role, expertise, experience, image_url, is_available)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Creative Director',
    ARRAY['Brand Strategy', 'UI Design', 'Team Leadership'],
    'Over 10 years of experience in creative direction and brand strategy',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Senior Designer',
    ARRAY['UI Design', 'UX Research', 'Prototyping'],
    'Specialized in creating intuitive user interfaces and conducting user research',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    true
  )
ON CONFLICT (user_id) DO NOTHING;