import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@aof.local';
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'ChangeMe123!', 10);

  await prisma.user.upsert({
    where: { email },
    update: { password },
    create: { email, password, role: 'admin' }
  });

  await prisma.specialist.createMany({
    data: [
      { name: 'Анна Петрова', position: 'Клинический психолог', description: 'Работа с тревожностью и самооценкой.', photoUrl: '/images/specialist-anna.svg' },
      { name: 'Максим Иванов', position: 'Семейный психолог', description: 'Сопровождение подростков и родителей.', photoUrl: '/images/specialist-maxim.svg' }
    ],
    skipDuplicates: true
  });

  await prisma.review.createMany({
    data: [
      { name: 'Мама Артёма, 15 лет', text: 'Сын стал спокойнее и увереннее.', rating: 5 },
      { name: 'Отец Софьи, 13 лет', text: 'Понравился системный подход и обратная связь.', rating: 5 }
    ],
    skipDuplicates: true
  });

  await prisma.blogPost.upsert({
    where: { slug: 'kak-pomoch-podrostku-pri-stresse' },
    update: {},
    create: {
      slug: 'kak-pomoch-podrostku-pri-stresse',
      title: 'Как помочь подростку при стрессе',
      excerpt: 'Практические шаги для родителей и подростков.',
      content: 'Длинная экспертная статья о стрессе и поддержке подростков...',
      coverImage: '/images/specialist-anna.svg'
    }
  });
}

main().finally(async () => prisma.$disconnect());
