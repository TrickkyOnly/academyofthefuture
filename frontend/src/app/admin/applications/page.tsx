'use client';

import { useEffect, useState } from 'react';
import { getClientApiBase } from '@/lib/api';
import { AdminGuard } from '@/components/AdminGuard';

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${getClientApiBase()}/admin/applications`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  return (
    <AdminGuard>
      <div className="container-page py-10">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Заявки</h1>
        <div className="grid gap-3">
          {items.map((i) => (
            <div key={i.id} className="glass p-4 rounded-xl">
              <p className="font-semibold text-blue-700">{i.name} · {i.phone}</p>
              <p className="text-sm text-blue-600">Тип: {i.type} · Статус: {i.status}</p>
              {i.message && <p className="text-sm mt-1">{i.message}</p>}
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}
