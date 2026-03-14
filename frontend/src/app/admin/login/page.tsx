'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.get('email'), password: form.get('password') })
    });
    if (!res.ok) return setError('Ошибка входа');
    const data = await res.json();
    localStorage.setItem('admin_token', data.token);
    router.push('/admin');
  }

  return <div className="container-page py-10 max-w-lg"><form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow grid gap-3"><h1 className="text-2xl font-bold">Admin Login</h1><input className="border rounded p-2" type="email" name="email" placeholder="Email"/><input className="border rounded p-2" type="password" name="password" placeholder="Password"/><button className="bg-primary text-white rounded p-2">Войти</button>{error && <p className="text-red-500 text-sm">{error}</p>}</form></div>;
}
