'use client';

import { FormEvent, useState } from 'react';
import { getClientApiBase } from '@/lib/api';
import { AdminGuard } from '@/components/AdminGuard';

export default function AdminPagesPage() {
  const [status, setStatus] = useState('');
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch(`${getClientApiBase()}/admin/pages`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
    });
    setStatus(res.ok ? 'SEO-страница сохранена' : 'Ошибка');
  }

  return (
    <AdminGuard>
      <div className="container-page py-10 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Управление SEO-страницами</h1>
        <form onSubmit={onSubmit} className="glass p-6 rounded-2xl grid gap-3">
          <input className="bg-white/80 border border-blue-200 rounded p-3" name="slug" required placeholder="Slug страницы (например: anxiety-help)"/>
          <input className="bg-white/80 border border-blue-200 rounded p-3" name="title" required placeholder="Заголовок страницы"/>
          <input className="bg-white/80 border border-blue-200 rounded p-3" name="metaTitle" placeholder="Meta title"/>
          <textarea className="bg-white/80 border border-blue-200 rounded p-3" name="metaDesc" placeholder="Meta description"/>
          <textarea className="bg-white/80 border border-blue-200 rounded p-3 min-h-40" name="content" required placeholder="Контент страницы"/>
          <button className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700">Сохранить страницу</button>
          {status && <p className="text-blue-700">{status}</p>}
        </form>
      </div>
    </AdminGuard>
  );
}
