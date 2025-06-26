import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/auth/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TeamDashboard } from './pages/dashboard/TeamDashboard';
import { useThemeStore } from './store/themeStore';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';

function App() {
  const { isDarkMode } = useThemeStore();
  const { setUser, setSession, checkRole } = useAuthStore();

  useEffect(() => {
    // Set up Supabase auth state listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkRole();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkRole();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession, checkRole]);

  return (
    <Router>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className={`min-h-screen transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-neutral-950 text-neutral-100' 
            : 'bg-neutral-50 text-neutral-900'
        } mesh-pattern`}>
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/dashboard/*" element={<TeamDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;