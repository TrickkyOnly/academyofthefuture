'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getClientApiBase } from '@/lib/api';
import { AdminGuard } from '@/components/AdminGuard';

export default function AdminHomePage() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${getClientApiBase()}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats({}));
  }, []);

  return (
    <AdminGuard>
      <div className="container-page py-10 grid gap-6">
        <h1 className="text-4xl font-bold text-blue-700">Admin Dashboard</h1>
        <div className="grid md:grid-cols-4 gap-4">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="glass rounded-2xl p-4">
              <p className="text-sm text-blue-500">{k}</p>
              <p className="text-2xl font-bold text-blue-700">{String(v)}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            ['Заявки', '/admin/applications'],
            ['Блог', '/admin/blog'],
            ['Отзывы', '/admin/reviews'],
            ['Специалисты', '/admin/specialists'],
            ['Страницы', '/admin/pages']
          ].map(([title, href]) => (
            <Link key={href} href={href} className="glass px-5 py-3 rounded-xl text-blue-700 hover:bg-white/80">{title}</Link>
          ))}
          <button className="glass px-5 py-3 rounded-xl text-blue-700" onClick={() => { localStorage.removeItem('admin_token'); location.href='/admin/login'; }}>
            Выйти
          </button>
        </div>
      </div>
    </AdminGuard>
  );
}
