import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';

export async function loginAdmin(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}
