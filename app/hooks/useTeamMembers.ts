"use client";

import { useState, useEffect } from 'react';
import { TeamMember } from '@/types/team';

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch('/api/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch team members');
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  return { members, loading, error };
}