'use client';

import { FormEvent, useState } from 'react';
import { getClientApiBase } from '@/lib/api';

export default function AdminReviewsPage() {
  const [status, setStatus] = useState('');
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch(`${getClientApiBase()}/admin/reviews`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
    });
    setStatus(res.ok ? 'Сохранено' : 'Ошибка');
  }

  return <div className="container-page py-10 max-w-2xl"><h1 className="text-3xl font-bold mb-4">Управление: отзывы</h1><form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow grid gap-3"><input className="border rounded p-2" name="name" placeholder="name"/><textarea className="border rounded p-2" name="text" placeholder="text"/><input className="border rounded p-2" name="rating" placeholder="rating"/><button className="bg-primary text-white rounded p-2">Сохранить</button>{status && <p>{status}</p>}</form></div>;
}
