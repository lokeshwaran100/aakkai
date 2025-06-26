/*
  # Fix User Roles Policies

  1. Changes
    - Drop existing policies on user_roles table
    - Create new non-recursive policies for user_roles table
    - Add basic select policy for authenticated users
    - Add admin management policy using a direct role check

  2. Security
    - Maintain RLS protection
    - Avoid recursive role checks
    - Ensure proper access control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;

-- Create new non-recursive policies
CREATE POLICY "Users can read own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin policy that checks the current user's role directly
CREATE POLICY "Admins can manage roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    user_id = auth.uid() OR (
      EXISTS (
        SELECT 1
        FROM user_roles ur
        WHERE ur.user_id = auth.uid()
        AND ur.role = 'admin'
      )
    )
  );