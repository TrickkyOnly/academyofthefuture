'use client';

import { FormEvent, useState } from 'react';
import { getClientApiBase } from '@/lib/api';

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

    const res = await fetch(`${getClientApiBase()}/applications`, {
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
    <form onSubmit={onSubmit} className="glass rounded-2xl p-6 grid gap-3">
      <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
      <input className="bg-white/80 border border-blue-200 rounded-lg p-3" name="name" required placeholder="Имя" />
      <input className="bg-white/80 border border-blue-200 rounded-lg p-3" name="phone" required placeholder="Телефон" />
      <input className="bg-white/80 border border-blue-200 rounded-lg p-3" name="email" placeholder="Email" />
      <input className="bg-white/80 border border-blue-200 rounded-lg p-3" name="program" placeholder="Программа" />
      <input className="bg-white/80 border border-blue-200 rounded-lg p-3" name="preferredAt" type="datetime-local" />
      <textarea className="bg-white/80 border border-blue-200 rounded-lg p-3" name="message" placeholder="Комментарий" />
      <button className="bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition-colors">Отправить</button>
      {status && <p className="text-sm text-blue-700">{status}</p>}
    </form>
  );
}
