'use client';

import { useEffect, useState } from 'react';

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/admin/applications`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return <div className="container-page py-10"><h1 className="text-3xl font-bold mb-4">Заявки</h1><div className="grid gap-3">{items.map(i=><div key={i.id} className="bg-white p-4 rounded-xl shadow">{i.name} · {i.phone} · {i.type}</div>)}</div></div>;
}
