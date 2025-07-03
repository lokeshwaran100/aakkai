-- Update all policies to remove lokeshwaran100@gmail.com from admin list

-- Update user_roles policies
DROP POLICY IF EXISTS "Admin emails can manage all roles" ON user_roles;

CREATE POLICY "Admin emails can manage all roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );

-- Update team_members policies
DROP POLICY IF EXISTS "Admin emails can manage all profiles" ON team_members;

CREATE POLICY "Admin emails can manage all profiles"
  ON team_members
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );

-- Update inquiries policies
DROP POLICY IF EXISTS "Admin emails can manage inquiries" ON inquiries;

CREATE POLICY "Admin emails can manage inquiries"
  ON inquiries
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );

-- Update notifications policies
DROP POLICY IF EXISTS "Admin emails can create notifications" ON notifications;

CREATE POLICY "Admin emails can create notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'email' IN (
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );

-- Update member_projects policies
DROP POLICY IF EXISTS "Admin emails can manage all projects" ON member_projects;

CREATE POLICY "Admin emails can manage all projects"
  ON member_projects
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      'devwithloki@gmail.com',
      'artsofshree@gmail.com'
    )
  );