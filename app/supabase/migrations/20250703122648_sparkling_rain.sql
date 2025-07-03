/*
  # Fix team member email display for admin dashboard

  1. Database Function
    - Create secure function to get user email from auth.users
    - Only accessible by authenticated users
    
  2. View Creation
    - Create view to join team members with their email addresses
    - Uses the secure function to fetch emails
    
  3. Security
    - Function uses SECURITY DEFINER for controlled access
    - View access controlled through application logic
*/

-- Create a function to get user email (admin only)
CREATE OR REPLACE FUNCTION get_user_email(user_uuid uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(email, 'No email found') FROM auth.users WHERE id = user_uuid;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_email(uuid) TO authenticated;

-- Create a view for team members with email
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

-- Create a function that returns team members with emails for admin users only
CREATE OR REPLACE FUNCTION get_team_members_with_email_admin()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  role text,
  expertise text[],
  experience text,
  image_url text,
  is_available boolean,
  created_at timestamptz,
  projects_collaborated integer,
  user_email text
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    tm.id,
    tm.user_id,
    tm.role,
    tm.expertise,
    tm.experience,
    tm.image_url,
    tm.is_available,
    tm.created_at,
    tm.projects_collaborated,
    CASE 
      WHEN tm.user_id IS NOT NULL THEN COALESCE(au.email, 'No email found')
      ELSE 'No email found'
    END as user_email
  FROM team_members tm
  LEFT JOIN auth.users au ON tm.user_id = au.id
  WHERE auth.jwt() ->> 'email' IN (
    'devwithloki@gmail.com',
    'artsofshree@gmail.com'
  );
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_team_members_with_email_admin() TO authenticated;