/*
  # Add projects collaborated field to team members

  1. Changes
    - Add projects_collaborated column to team_members table
    - Set default value to 0 for existing records
    - Update existing records with sample data

  2. Security
    - Maintain existing RLS policies
*/

-- Add projects_collaborated column to team_members table
ALTER TABLE team_members 
ADD COLUMN IF NOT EXISTS projects_collaborated integer DEFAULT 0;

-- Update existing team members with sample project counts
UPDATE team_members 
SET projects_collaborated = CASE 
  WHEN role = 'Creative Director' THEN 25
  WHEN role = 'Senior Designer' THEN 18
  ELSE 5
END
WHERE projects_collaborated = 0;