'use client';

import { FormEvent, useState } from 'react';
import { getClientApiBase } from '@/lib/api';
import { AdminGuard } from '@/components/AdminGuard';

export default function AdminBlogPage() {
  const [status, setStatus] = useState('');
  const [coverImage, setCoverImage] = useState('');

  async function upload(file?: File | null) {
    if (!file) return;
    const token = localStorage.getItem('admin_token');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${getClientApiBase()}/admin/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form });
    const data = await res.json();
    setCoverImage(data.url || '');
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const form = new FormData(e.currentTarget);
    const payload = {
      slug: form.get('slug'),
      title: form.get('title'),
      excerpt: form.get('excerpt'),
      content: form.get('content'),
      coverImage,
      published: true
    };
    const res = await fetch(`${getClientApiBase()}/admin/blog`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
    });
    setStatus(res.ok ? 'Статья сохранена' : 'Ошибка сохранения');
  }

  return (
    <AdminGuard>
      <div className="container-page py-10 max-w-5xl">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Управление блогом</h1>
        <form onSubmit={onSubmit} className="glass p-6 rounded-2xl grid gap-3">
          <input className="bg-white/80 border border-blue-200 rounded p-3" name="slug" required placeholder="Slug (пример: kak-pomoch-podrostku)"/>
          <input className="bg-white/80 border border-blue-200 rounded p-3" name="title" required placeholder="Заголовок статьи"/>
          <textarea className="bg-white/80 border border-blue-200 rounded p-3 min-h-24" name="excerpt" required placeholder="Краткое описание статьи"/>
          <textarea className="bg-white/80 border border-blue-200 rounded p-3 min-h-40" name="content" required placeholder="Полный текст статьи"/>
          <label className="text-sm text-blue-700">Обложка статьи
            <input className="block mt-2" type="file" accept="image/*" onChange={(e)=>upload(e.target.files?.[0])}/>
          </label>
          {coverImage && <p className="text-sm text-blue-600">Загружено: {coverImage}</p>}
          <button className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700">Сохранить статью</button>
          {status && <p className="text-blue-700">{status}</p>}
        </form>
      </div>
    </AdminGuard>
  );
}
