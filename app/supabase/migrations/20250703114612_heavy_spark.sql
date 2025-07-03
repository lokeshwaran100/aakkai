/*
  # Fix Public Access to Projects on Work Page

  1. Security Changes
    - Allow public (unauthenticated) users to read completed projects
    - This enables the Work page to display projects without requiring login
  
  2. Sample Data
    - Add sample completed projects to showcase the work
    - Include projects with different categories and tags
*/

-- Allow public access to read completed projects (for Work page)
CREATE POLICY "Public can view completed projects"
  ON member_projects
  FOR SELECT
  TO public
  USING (status = 'completed');

-- Insert sample team members if they don't exist
INSERT INTO team_members (id, role, expertise, experience, is_available, projects_collaborated, created_at)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'Creative Director',
    ARRAY['Branding', 'UI/UX Designing'],
    'Over 10 years of experience in creative direction and brand strategy, leading innovative design solutions for Fortune 500 companies.',
    true,
    15,
    NOW()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Senior Designer',
    ARRAY['UI/UX Designing'],
    'Specialized in user experience design and interface development with 8 years of experience creating award-winning digital products.',
    true,
    12,
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample completed projects
INSERT INTO member_projects (
  id,
  title,
  description,
  image_url,
  tags,
  status,
  start_date,
  end_date,
  member_id,
  created_at
)
VALUES 
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'TechFlow Brand Identity',
    'Complete brand identity redesign for a leading technology company, including logo design, color palette, typography, and brand guidelines.',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80',
    ARRAY['Branding', 'Logo Design', 'Identity Design'],
    'completed',
    '2024-01-15',
    '2024-03-01',
    '11111111-1111-1111-1111-111111111111',
    NOW() - INTERVAL '2 months'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'HealthCare Mobile App',
    'User-centered mobile application design for healthcare management, featuring intuitive navigation and accessibility-focused interface.',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80',
    ARRAY['UI/UX Designing', 'Mobile App', 'Healthcare'],
    'completed',
    '2024-02-01',
    '2024-04-15',
    '22222222-2222-2222-2222-222222222222',
    NOW() - INTERVAL '1 month'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'E-commerce Platform Redesign',
    'Complete redesign of an e-commerce platform focusing on conversion optimization and user experience improvements.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80',
    ARRAY['UI/UX Designing', 'Web Design', 'E-commerce'],
    'completed',
    '2024-01-01',
    '2024-02-28',
    '22222222-2222-2222-2222-222222222222',
    NOW() - INTERVAL '3 months'
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'StartupCo Brand Strategy',
    'Comprehensive brand strategy and visual identity for an innovative startup in the fintech space.',
    'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80',
    ARRAY['Branding', 'Brand Strategy', 'Fintech'],
    'completed',
    '2023-11-01',
    '2024-01-15',
    '11111111-1111-1111-1111-111111111111',
    NOW() - INTERVAL '4 months'
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'Dashboard Analytics Interface',
    'Modern dashboard design for business analytics platform with focus on data visualization and user workflow optimization.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    ARRAY['UI/UX Designing', 'Dashboard', 'Data Visualization'],
    'completed',
    '2024-03-01',
    '2024-04-30',
    '22222222-2222-2222-2222-222222222222',
    NOW() - INTERVAL '2 weeks'
  ),
  (
    'ffffffff-ffff-ffff-ffff-ffffffffffff',
    'Restaurant Chain Rebrand',
    'Complete rebranding project for a national restaurant chain including logo, packaging, and store design guidelines.',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
    ARRAY['Branding', 'Logo Design', 'Packaging Design'],
    'completed',
    '2023-10-01',
    '2023-12-15',
    '11111111-1111-1111-1111-111111111111',
    NOW() - INTERVAL '5 months'
  )
ON CONFLICT (id) DO NOTHING;