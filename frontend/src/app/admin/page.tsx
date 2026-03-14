'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminHomePage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <div className="container-page py-10 grid gap-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        {stats && Object.entries(stats).map(([k, v]) => <div key={k} className="bg-white p-4 rounded-2xl shadow"><p className="text-sm text-slate-500">{k}</p><p className="text-2xl font-bold">{String(v)}</p></div>)}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/applications" className="bg-white rounded-xl px-4 py-2 shadow">Заявки</Link>
        <Link href="/admin/blog" className="bg-white rounded-xl px-4 py-2 shadow">Блог</Link>
        <Link href="/admin/reviews" className="bg-white rounded-xl px-4 py-2 shadow">Отзывы</Link>
        <Link href="/admin/specialists" className="bg-white rounded-xl px-4 py-2 shadow">Специалисты</Link>
        <Link href="/admin/pages" className="bg-white rounded-xl px-4 py-2 shadow">Страницы</Link>
      </div>
    </div>
  );
}
