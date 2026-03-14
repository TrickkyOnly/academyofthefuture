import { prisma } from '../config/prisma.js';

export const listApplications = async (req, res) => res.json(await prisma.application.findMany({ orderBy: { createdAt: 'desc' } }));

export const getStats = async (req, res) => {
  const [applications, posts, reviews, specialists] = await Promise.all([
    prisma.application.count(),
    prisma.blogPost.count(),
    prisma.review.count(),
    prisma.specialist.count()
  ]);
  res.json({ applications, posts, reviews, specialists });
};

export const upsertReview = async (req, res) => {
  const { id, name, text, rating = 5 } = req.body;
  const review = id
    ? await prisma.review.update({ where: { id }, data: { name, text, rating } })
    : await prisma.review.create({ data: { name, text, rating } });
  res.json(review);
};

export const upsertSpecialist = async (req, res) => {
  const { id, name, position, description, photoUrl } = req.body;
  const specialist = id
    ? await prisma.specialist.update({ where: { id }, data: { name, position, description, photoUrl } })
    : await prisma.specialist.create({ data: { name, position, description, photoUrl } });
  res.json(specialist);
};

export const upsertBlogPost = async (req, res) => {
  const { id, slug, title, excerpt, content, coverImage, published = true } = req.body;
  const data = { slug, title, excerpt, content, coverImage, published };
  const post = id
    ? await prisma.blogPost.update({ where: { id }, data })
    : await prisma.blogPost.create({ data });
  res.json(post);
};

export const upsertPage = async (req, res) => {
  const { slug, title, metaTitle, metaDesc, content } = req.body;
  const page = await prisma.page.upsert({
    where: { slug },
    update: { title, metaTitle, metaDesc, content },
    create: { slug, title, metaTitle, metaDesc, content }
  });
  res.json(page);
};
