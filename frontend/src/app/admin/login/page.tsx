'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClientApiBase } from '@/lib/api';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch(`${getClientApiBase()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.get('email'), password: form.get('password') })
    });

    if (!res.ok) {
      setLoading(false);
      return setError('Неверный логин или пароль');
    }

    const data = await res.json();
    localStorage.setItem('admin_token', data.token);
    router.push('/admin');
  }

  return (
    <div className="container-page py-10 max-w-lg">
      <form onSubmit={onSubmit} className="glass rounded-2xl p-6 grid gap-3">
        <h1 className="text-3xl font-bold text-blue-700">Вход в админ-панель</h1>
        <input className="bg-white/80 border border-blue-200 rounded p-3" type="email" name="email" required placeholder="Email администратора"/>
        <input className="bg-white/80 border border-blue-200 rounded p-3" type="password" name="password" required placeholder="Пароль"/>
        <button disabled={loading} className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700 disabled:opacity-60">{loading ? 'Вход...' : 'Войти'}</button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
