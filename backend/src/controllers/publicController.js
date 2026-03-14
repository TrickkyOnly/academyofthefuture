import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { sanitizeText } from '../utils/sanitize.js';
import { sendTelegramNotification } from '../services/telegramService.js';

const applicationSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().optional(),
  program: z.string().optional(),
  preferredAt: z.string().datetime().optional(),
  type: z.enum(['PROGRAM', 'CALLBACK', 'CONSULTATION', 'ONLINE_BOOKING'])
});

export async function createApplication(req, res) {
  const parsed = applicationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' });

  const payload = parsed.data;
  const application = await prisma.application.create({
    data: {
      name: sanitizeText(payload.name),
      phone: sanitizeText(payload.phone),
      email: payload.email ? sanitizeText(payload.email) : null,
      message: payload.message ? sanitizeText(payload.message) : null,
      program: payload.program ? sanitizeText(payload.program) : null,
      preferredAt: payload.preferredAt ? new Date(payload.preferredAt) : null,
      type: payload.type
    }
  });

  await sendTelegramNotification(
    `📩 Новая заявка\n<b>${application.name}</b> (${application.phone})\nТип: ${application.type}`
  );

  return res.status(201).json(application);
}

export async function getPrograms(req, res) {
  return res.json([
    { slug: 'individual', title: 'Индивидуальная программа', duration: '8 недель' },
    { slug: 'group', title: 'Групповая программа', duration: '10 недель' },
    { slug: 'family', title: 'Семейная программа', duration: '6 недель' }
  ]);
}

export async function getSpecialists(req, res) {
  return res.json(await prisma.specialist.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function getReviews(req, res) {
  return res.json(await prisma.review.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function getBlog(req, res) {
  return res.json(await prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' } }));
}

export async function getBlogPost(req, res) {
  const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
  if (!post) return res.status(404).json({ message: 'Not found' });
  return res.json(post);
}

export async function getServicePage(req, res) {
  const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
  if (!page) return res.status(404).json({ message: 'Not found' });
  return res.json(page);
}
