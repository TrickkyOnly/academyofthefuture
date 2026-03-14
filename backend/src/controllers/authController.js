import { z } from 'zod';
import { loginAdmin } from '../services/authService.js';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function login(req, res) {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' });

  const result = await loginAdmin(parsed.data.email, parsed.data.password);
  if (!result) return res.status(401).json({ message: 'Неверные данные' });

  return res.json(result);
}
