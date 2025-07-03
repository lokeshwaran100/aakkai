/*
  # Fix infinite recursion in user_roles policies

  1. Policy Updates
    - Remove recursive policies that cause infinite loops
    - Create simple, direct policies for user_roles table
    - Use email-based admin check instead of role-based check
    - Ensure OAuth users can create and read their roles

  2. Security
    - Maintain proper access control
    - Allow users to manage their own roles
    - Prevent unauthorized access
*/

-- Drop all existing policies on user_roles to start fresh
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
DROP POLICY IF EXISTS "Users can create own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;

-- Create simple, non-recursive policies for user_roles
-- Allow users to read their own role
CREATE POLICY "Users can read own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own role (needed for OAuth signup)
CREATE POLICY "Users can insert own role"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own role (needed for role changes)
CREATE POLICY "Users can update own role"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow admin emails to manage all roles (using email check instead of role check)
CREATE POLICY "Admin emails can manage all roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'lokeshwaran100@gmail.com',
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );

-- Update team_members policies to use email-based admin check
DROP POLICY IF EXISTS "Admins can manage all profiles" ON team_members;

-- Allow admin emails to manage all team member profiles
CREATE POLICY "Admin emails can manage all profiles"
  ON team_members
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'lokeshwaran100@gmail.com',
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );

-- Update inquiries policies to use email-based admin check
DROP POLICY IF EXISTS "Admins can view and manage inquiries" ON inquiries;

-- Allow admin emails to manage all inquiries
CREATE POLICY "Admin emails can manage inquiries"
  ON inquiries
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'lokeshwaran100@gmail.com',
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );

-- Update notifications policies to use email-based admin check
DROP POLICY IF EXISTS "Admins can create notifications" ON notifications;

-- Allow admin emails to create notifications
CREATE POLICY "Admin emails can create notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'email' IN (
      'lokeshwaran100@gmail.com',
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );

-- Update member_projects policies to use email-based admin check
DROP POLICY IF EXISTS "Dev Policy" ON member_projects;

-- Allow all authenticated users to read member_projects
CREATE POLICY "Users can read projects"
  ON member_projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to manage their own projects
CREATE POLICY "Users can manage own projects"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (
    member_id IN (
      SELECT id FROM team_members WHERE user_id = auth.uid()
    )
  );

-- Allow admin emails to manage all projects
CREATE POLICY "Admin emails can manage all projects"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'lokeshwaran100@gmail.com',
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );