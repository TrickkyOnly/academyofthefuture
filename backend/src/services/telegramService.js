import fetch from 'node-fetch';
import { env } from '../config/env.js';

export async function sendTelegramNotification(text) {
  if (!env.telegramBotToken || !env.telegramChatId) return;

  const url = `https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.telegramChatId,
      text,
      parse_mode: 'HTML'
    })
  });
}
