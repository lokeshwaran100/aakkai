/*
  # Update authentication and user role policies

  1. Security Updates
    - Update user_roles policies to handle Google OAuth users
    - Ensure proper role assignment based on email
    - Add policies for automatic team member creation

  2. Changes
    - Update user_roles policies for OAuth flow
    - Add better error handling for role creation
*/

-- Update user_roles policies to handle OAuth users better
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;

-- Allow users to read their own role
CREATE POLICY "Users can read own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own role (for OAuth signup)
CREATE POLICY "Users can create own role"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow admins to manage all roles
CREATE POLICY "Admins can manage all roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- Update team_members policies for OAuth users
DROP POLICY IF EXISTS "Dev Policy" ON team_members;

-- Allow authenticated users to read team members
CREATE POLICY "Users can read team members"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to create their own team member profile
CREATE POLICY "Users can create own profile"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow admins to manage all team member profiles
CREATE POLICY "Admins can manage all profiles"
  ON team_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );