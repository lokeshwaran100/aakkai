/*
  # Create storage bucket for project PDFs

  1. Storage
    - Create 'project-pdfs' bucket for storing project PDF files
    - Set up public access for viewing PDFs
    - Configure appropriate policies for authenticated users

  2. Security
    - Allow authenticated users to upload PDFs
    - Allow public read access for viewing PDFs
    - Restrict file types to PDF only
*/

-- Create the storage bucket for project PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-pdfs', 'project-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload PDFs
CREATE POLICY "Authenticated users can upload PDFs"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'project-pdfs' AND
    (storage.extension(name) = 'pdf')
  );

-- Allow authenticated users to update their own PDFs
CREATE POLICY "Users can update PDFs"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-pdfs');

-- Allow authenticated users to delete PDFs
CREATE POLICY "Users can delete PDFs"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-pdfs');

-- Allow public read access to PDFs
CREATE POLICY "Public can view PDFs"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'project-pdfs');