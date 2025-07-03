/*
  # Add Admin RPC Function for Inquiries

  This migration adds a PostgreSQL function that allows admin users
  to bypass RLS and fetch all inquiries directly.

  1. New Functions
    - get_all_inquiries_admin: Returns all inquiries for admin users
    
  2. Security
    - Function has SECURITY DEFINER to bypass RLS
    - Only accessible to authenticated users
    - Returns all inquiry data for admin dashboard
*/

-- Create function to get all inquiries for admin users
CREATE OR REPLACE FUNCTION public.get_all_inquiries_admin()
RETURNS TABLE (
  id uuid,
  name text,
  email text,
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
    i.message,
    i.status,
    i.created_at
  FROM inquiries i
  ORDER BY i.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_all_inquiries_admin() TO authenticated;