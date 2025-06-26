/*
  # Seed Data for Aakkai Platform

  This migration adds sample data for:
  - Projects
  - Inquiries
  
  Note: User-related data will be created through the application's signup process
*/

-- Add sample projects
INSERT INTO projects (title, description, image_url, tags)
VALUES
  (
    'Modern E-commerce Redesign',
    'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    ARRAY['E-commerce', 'UI Design', 'UX Design']
  ),
  (
    'Financial App Branding',
    'Comprehensive brand identity development for a innovative fintech startup',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    ARRAY['Branding', 'Finance', 'Identity Design']
  ),
  (
    'Healthcare Platform UX',
    'User experience design for a healthcare management platform',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    ARRAY['Healthcare', 'UX Design', 'Web App']
  );

-- Add sample inquiries
INSERT INTO inquiries (name, email, message, status)
VALUES
  (
    'John Smith',
    'john.smith@example.com',
    'Looking for help with rebranding our company. We need a complete brand refresh including logo, website, and marketing materials.',
    'new'
  ),
  (
    'Sarah Johnson',
    'sarah.j@example.com',
    'Interested in your UI/UX services for our mobile app. Would love to schedule a consultation.',
    'in_progress'
  ),
  (
    'Michael Brown',
    'michael.b@example.com',
    'Need assistance with brand strategy for our startup. We''re launching in 3 months.',
    'completed'
  );