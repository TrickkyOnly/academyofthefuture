'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClientApiBase } from '@/lib/api';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    fetch(`${getClientApiBase()}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error('unauthorized');
        setReady(true);
      })
      .catch(() => {
        localStorage.removeItem('admin_token');
        router.replace('/admin/login');
      });
  }, [router]);

  if (!ready) return <div className="container-page py-10 text-blue-700">Проверка доступа...</div>;
  return <>{children}</>;
}
