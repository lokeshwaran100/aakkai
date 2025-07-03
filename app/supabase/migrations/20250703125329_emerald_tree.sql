/*
  # Add project category field

  1. Schema Changes
    - Add `category` column to `member_projects` table
    - Set default value and add check constraint for valid categories
    - Update existing projects with default category

  2. Categories
    - FMCG (Fast-Moving Consumer Goods)
    - Food & Beverage / QSR (Quick Service Restaurants)
    - Fashion & Lifestyle
    - Health, Wellness & Fitness
    - Real Estate & Home Interiors
    - Others
*/

-- Add category column to member_projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_projects' AND column_name = 'category'
  ) THEN
    ALTER TABLE member_projects ADD COLUMN category text DEFAULT 'Others';
  END IF;
END $$;

-- Add check constraint for valid categories
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'member_projects_category_check'
  ) THEN
    ALTER TABLE member_projects 
    ADD CONSTRAINT member_projects_category_check 
    CHECK (category IN (
      'FMCG (Fast-Moving Consumer Goods)',
      'Food & Beverage / QSR (Quick Service Restaurants)',
      'Fashion & Lifestyle',
      'Health, Wellness & Fitness',
      'Real Estate & Home Interiors',
      'Others'
    ));
  END IF;
END $$;

-- Update existing projects with appropriate categories based on their tags
UPDATE member_projects 
SET category = CASE 
  WHEN 'Healthcare' = ANY(tags) OR 'Health' = ANY(tags) OR 'Fitness' = ANY(tags) THEN 'Health, Wellness & Fitness'
  WHEN 'Fashion' = ANY(tags) OR 'Lifestyle' = ANY(tags) THEN 'Fashion & Lifestyle'
  WHEN 'Food' = ANY(tags) OR 'Restaurant' = ANY(tags) OR 'QSR' = ANY(tags) THEN 'Food & Beverage / QSR (Quick Service Restaurants)'
  WHEN 'Real Estate' = ANY(tags) OR 'Home' = ANY(tags) OR 'Interior' = ANY(tags) THEN 'Real Estate & Home Interiors'
  WHEN 'FMCG' = ANY(tags) OR 'Consumer Goods' = ANY(tags) THEN 'FMCG (Fast-Moving Consumer Goods)'
  ELSE 'Others'
END
WHERE category = 'Others' OR category IS NULL;