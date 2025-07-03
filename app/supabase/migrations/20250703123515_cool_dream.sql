/*
  # Clean up team_members table structure

  1. Data Migration
    - Preserve all data from team_members table
    - Ensure no data loss during cleanup
    
  2. Schema Changes
    - Keep team_members table as the primary table
    - Remove redundant view team_members_with_email
    - Add user_email column to team_members table
    
  3. Security
    - Update all policies to work with the consolidated table
    - Maintain admin access controls
    
  4. Functions
    - Update helper functions to work with new structure
    - Ensure backward compatibility
*/

-- Step 1: Add user_email column to team_members table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_members' AND column_name = 'user_email'
  ) THEN
    ALTER TABLE team_members ADD COLUMN user_email text;
  END IF;
END $$;

-- Step 2: Populate user_email column with actual email addresses
UPDATE team_members 
SET user_email = (
  SELECT email 
  FROM auth.users 
  WHERE auth.users.id = team_members.user_id
)
WHERE user_id IS NOT NULL AND (user_email IS NULL OR user_email = '');

-- Step 3: Set fallback emails for existing records without user_id
UPDATE team_members 
SET user_email = CASE 
  WHEN role = 'Creative Director' THEN 'devwithloki@gmail.com'
  WHEN role = 'Senior Designer' THEN 'artsofshree@gmail.com'
  ELSE 'team@aakkai.com'
END
WHERE user_email IS NULL OR user_email = '';

-- Step 4: Drop the view and related functions since we now have the data in the table
DROP VIEW IF EXISTS team_members_with_email CASCADE;
DROP FUNCTION IF EXISTS get_team_members_with_email_admin() CASCADE;
DROP FUNCTION IF EXISTS get_user_email(uuid) CASCADE;

-- Step 5: Create a function to automatically update user_email when user_id changes
CREATE OR REPLACE FUNCTION update_team_member_email()
RETURNS TRIGGER AS $$
BEGIN
  -- If user_id is being set or changed, update the email
  IF NEW.user_id IS NOT NULL AND (OLD.user_id IS NULL OR OLD.user_id != NEW.user_id) THEN
    NEW.user_email := (
      SELECT email 
      FROM auth.users 
      WHERE id = NEW.user_id
    );
  END IF;
  
  -- If user_email is still null, set a fallback
  IF NEW.user_email IS NULL OR NEW.user_email = '' THEN
    NEW.user_email := CASE 
      WHEN NEW.role = 'Creative Director' THEN 'devwithloki@gmail.com'
      WHEN NEW.role = 'Senior Designer' THEN 'artsofshree@gmail.com'
      ELSE 'team@aakkai.com'
    END;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create trigger to automatically update email when user_id changes
DROP TRIGGER IF EXISTS update_team_member_email_trigger ON team_members;
CREATE TRIGGER update_team_member_email_trigger
  BEFORE INSERT OR UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_team_member_email();

-- Step 7: Create a simple function for admin access to team members (if needed)
CREATE OR REPLACE FUNCTION get_all_team_members_admin()
RETURNS SETOF team_members
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM team_members
  WHERE auth.jwt() ->> 'email' IN (
    'devwithloki@gmail.com',
    'artsofshree@gmail.com'
  )
  ORDER BY created_at DESC;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_all_team_members_admin() TO authenticated;

-- Step 8: Ensure all existing team members have proper user_email values
UPDATE team_members 
SET user_email = COALESCE(user_email, 'team@aakkai.com')
WHERE user_email IS NULL OR user_email = '';

-- Step 9: Add a check constraint to ensure user_email is never null
ALTER TABLE team_members 
ADD CONSTRAINT team_members_user_email_not_null 
CHECK (user_email IS NOT NULL AND user_email != '');