/*
  # Add INSERT policy for member_projects table

  1. Security Changes
    - Add INSERT policy for `member_projects` table
    - Allow team members to create projects where they are the owner (member_id matches their team_members.id)
    
  2. Policy Details
    - Policy name: "Team members can create own projects"
    - Allows authenticated users to INSERT into member_projects
    - Restricts insertion to projects where member_id matches the user's team_members.id
*/

-- Add INSERT policy for member_projects table
CREATE POLICY "Team members can create own projects"
  ON member_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (member_id IN (
    SELECT team_members.id
    FROM team_members
    WHERE team_members.user_id = auth.uid()
  ));