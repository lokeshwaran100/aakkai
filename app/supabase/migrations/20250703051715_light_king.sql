/*
  # Add PDF support to member_projects table

  1. New Columns
    - `pdf_url` (text, nullable) - URL to the project PDF file
    - `pdf_filename` (text, nullable) - Original filename of the uploaded PDF

  2. Security
    - Update existing RLS policies to include new columns
*/

-- Add PDF support columns to member_projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_projects' AND column_name = 'pdf_url'
  ) THEN
    ALTER TABLE member_projects ADD COLUMN pdf_url text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_projects' AND column_name = 'pdf_filename'
  ) THEN
    ALTER TABLE member_projects ADD COLUMN pdf_filename text;
  END IF;
END $$;