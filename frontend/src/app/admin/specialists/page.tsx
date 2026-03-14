'use client';

import { FormEvent, useState } from 'react';
import { getClientApiBase } from '@/lib/api';
import { AdminGuard } from '@/components/AdminGuard';

export default function AdminSpecialistsPage() {
  const [status, setStatus] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  async function upload(file?: File | null) {
    if (!file) return;
    const token = localStorage.getItem('admin_token');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${getClientApiBase()}/admin/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form });
    const data = await res.json();
    setPhotoUrl(data.url || '');
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      position: form.get('position'),
      description: form.get('description'),
      photoUrl
    };
    const res = await fetch(`${getClientApiBase()}/admin/specialists`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
    });
    setStatus(res.ok ? 'Специалист сохранен' : 'Ошибка сохранения');
  }

  return (
    <AdminGuard>
      <div className="container-page py-10 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Управление специалистами</h1>
        <form onSubmit={onSubmit} className="glass p-6 rounded-2xl grid gap-3">
          <input className="bg-white/80 border border-blue-200 rounded p-3" name="name" required placeholder="ФИО специалиста"/>
          <input className="bg-white/80 border border-blue-200 rounded p-3" name="position" required placeholder="Должность (например, клинический психолог)"/>
          <textarea className="bg-white/80 border border-blue-200 rounded p-3 min-h-32" name="description" required placeholder="Описание опыта и направлений работы"/>
          <label className="text-sm text-blue-700">Фото специалиста
            <input className="block mt-2" type="file" accept="image/*" onChange={(e)=>upload(e.target.files?.[0])}/>
          </label>
          {photoUrl && <p className="text-sm text-blue-600">Загружено: {photoUrl}</p>}
          <button className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700">Сохранить специалиста</button>
          {status && <p className="text-blue-700">{status}</p>}
        </form>
      </div>
    </AdminGuard>
  );
}
