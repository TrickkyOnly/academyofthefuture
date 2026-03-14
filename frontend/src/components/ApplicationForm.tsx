'use client';

import { FormEvent, useState } from 'react';

type Props = { type: 'PROGRAM' | 'CALLBACK' | 'CONSULTATION' | 'ONLINE_BOOKING'; title: string };

export function ApplicationForm({ type, title }: Props) {
  const [status, setStatus] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      name: String(form.get('name') || ''),
      phone: String(form.get('phone') || ''),
      email: String(form.get('email') || ''),
      message: String(form.get('message') || ''),
      type,
      program: String(form.get('program') || ''),
      preferredAt: form.get('preferredAt') ? new Date(String(form.get('preferredAt'))).toISOString() : undefined
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setStatus('Спасибо! Мы скоро свяжемся с вами.');
      e.currentTarget.reset();
      return;
    }
    setStatus('Ошибка отправки. Попробуйте позже.');
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 shadow grid gap-3">
      <h3 className="text-xl font-semibold">{title}</h3>
      <input className="border rounded-lg p-3" name="name" required placeholder="Имя" />
      <input className="border rounded-lg p-3" name="phone" required placeholder="Телефон" />
      <input className="border rounded-lg p-3" name="email" placeholder="Email" />
      <input className="border rounded-lg p-3" name="program" placeholder="Программа" />
      <input className="border rounded-lg p-3" name="preferredAt" type="datetime-local" />
      <textarea className="border rounded-lg p-3" name="message" placeholder="Комментарий" />
      <button className="bg-primary text-white rounded-lg py-3 hover:opacity-90">Отправить</button>
      {status && <p className="text-sm text-slate-600">{status}</p>}
    </form>
  );
}
