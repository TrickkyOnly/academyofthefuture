'use client';

import { useEffect, useState } from 'react';

export function useAdminToken() {
  const [token, setToken] = useState<string>('');
  useEffect(() => setToken(localStorage.getItem('admin_token') || ''), []);
  return token;
}
