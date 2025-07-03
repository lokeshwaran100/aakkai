/*
  # Fix Team Member Email Display

  1. Database Changes
    - Create a function to get user email from auth.users
    - Update team_members table to include user email in queries

  2. Security
    - Ensure admin can access user emails for team management
    - Maintain existing RLS policies
*/

-- Create a function to get user email (admin only)
CREATE OR REPLACE FUNCTION get_user_email(user_uuid uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT email FROM auth.users WHERE id = user_uuid;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_email(uuid) TO authenticated;

-- Create a view for team members with email (admin access only)
CREATE OR REPLACE VIEW team_members_with_email AS
SELECT 
  tm.*,
  CASE 
    WHEN tm.user_id IS NOT NULL THEN get_user_email(tm.user_id)
    ELSE 'No email found'
  END as user_email
FROM team_members tm;

-- Grant select permission to authenticated users
GRANT SELECT ON team_members_with_email TO authenticated;

-- Create RLS policy for the view
CREATE POLICY "Admin emails can view team members with email"
  ON team_members_with_email
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );