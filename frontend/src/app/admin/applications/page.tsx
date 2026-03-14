'use client';

import { useEffect, useState } from 'react';
import { getClientApiBase } from '@/lib/api';

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${getClientApiBase()}/admin/applications`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return <div className="container-page py-10"><h1 className="text-3xl font-bold mb-4">Заявки</h1><div className="grid gap-3">{items.map(i=><div key={i.id} className="bg-white p-4 rounded-xl shadow">{i.name} · {i.phone} · {i.type}</div>)}</div></div>;
}
