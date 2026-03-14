'use client';

import { FormEvent, useState } from 'react';
import { getClientApiBase } from '@/lib/api';
import { AdminGuard } from '@/components/AdminGuard';

export default function AdminReviewsPage() {
  const [status, setStatus] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const form = new FormData(e.currentTarget);
    const payload = { name: form.get('name'), text: form.get('text'), rating: Number(form.get('rating') || 5) };
    const res = await fetch(`${getClientApiBase()}/admin/reviews`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
    });
    setStatus(res.ok ? 'Отзыв сохранен' : 'Ошибка сохранения');
  }

  return (
    <AdminGuard>
      <div className="container-page py-10 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Управление отзывами</h1>
        <form onSubmit={onSubmit} className="glass p-6 rounded-2xl grid gap-3">
          <input className="bg-white/80 border border-blue-200 rounded p-3" name="name" required placeholder="Кто оставил отзыв"/>
          <textarea className="bg-white/80 border border-blue-200 rounded p-3 min-h-32" name="text" required placeholder="Текст отзыва"/>
          <input className="bg-white/80 border border-blue-200 rounded p-3" type="number" min={1} max={5} name="rating" defaultValue={5} placeholder="Оценка от 1 до 5"/>
          <button className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700">Сохранить отзыв</button>
          {status && <p className="text-blue-700">{status}</p>}
        </form>
      </div>
    </AdminGuard>
  );
}
