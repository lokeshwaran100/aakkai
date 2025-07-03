/*
  # Add Service Column to Inquiries Table

  1. Changes
    - Add service column to inquiries table
    - Update existing inquiries to extract service from message
    - Drop and recreate admin RPC function with new signature
    - Clean up message content by removing service prefix

  2. Security
    - Maintain RLS protection
    - Update admin function to include service column
*/

-- Add service column to inquiries table
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS service text;

-- Update existing inquiries to extract service from message if it exists
UPDATE inquiries 
SET service = CASE 
  WHEN message LIKE 'Service:%' THEN 
    TRIM(SUBSTRING(message FROM 'Service: ([^\n]+)'))
  ELSE 
    'General Inquiry'
END
WHERE service IS NULL;

-- Drop existing function first to avoid return type conflict
DROP FUNCTION IF EXISTS public.get_all_inquiries_admin();

-- Create the admin RPC function with new signature including service column
CREATE OR REPLACE FUNCTION public.get_all_inquiries_admin()
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  service text,
  message text,
  status text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Return all inquiries (bypassing RLS)
  RETURN QUERY
  SELECT 
    i.id,
    i.name,
    i.email,
    i.service,
    -- Clean message by removing service prefix if it exists
    CASE 
      WHEN i.message LIKE 'Service:%' THEN 
        TRIM(SUBSTRING(i.message FROM 'Service: [^\n]+\n\n(.*)'))
      ELSE 
        i.message
    END as message,
    i.status,
    i.created_at
  FROM inquiries i
  ORDER BY i.created_at DESC;
END;
$$;