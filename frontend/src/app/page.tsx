import Link from 'next/link';
import { apiGet } from '@/lib/api';
import { ApplicationForm } from '@/components/ApplicationForm';
import { Review, Specialist, BlogPost } from '@/types';

export default async function HomePage() {
  const [specialists, reviews, posts] = await Promise.all([
    apiGet<Specialist[]>('/specialists').catch(() => []),
    apiGet<Review[]>('/reviews').catch(() => []),
    apiGet<BlogPost[]>('/blog').catch(() => [])
  ]);

  return (
    <div className="container-page py-10 grid gap-14">
      <section className="bg-gradient-to-r from-primary to-accent text-white rounded-3xl p-10 grid gap-4">
        <h1 className="text-4xl font-bold max-w-2xl">Психологическая помощь подросткам: мягко, научно, эффективно</h1>
        <p className="max-w-2xl">Новый стандарт поддержки подростков и родителей: диагностика, индивидуальные маршруты, онлайн и офлайн сопровождение.</p>
        <div className="flex gap-3">
          <Link href="/programs" className="bg-white text-primary px-5 py-3 rounded-xl font-semibold">Выбрать программу</Link>
          <Link href="/contacts" className="border border-white px-5 py-3 rounded-xl">Связаться</Link>
        </div>
      </section>

      <section><h2 className="text-2xl font-semibold mb-4">Преимущества центра</h2><div className="grid md:grid-cols-3 gap-4">{['Команда экспертов','Доказательные практики','Поддержка семьи'].map(v=><div key={v} className="bg-white p-5 rounded-2xl shadow">{v}</div>)}</div></section>
      <section><h2 className="text-2xl font-semibold mb-4">Программы</h2><div className="grid md:grid-cols-3 gap-4">{['Индивидуальная','Групповая','Семейная'].map(v=><div key={v} className="bg-white p-5 rounded-2xl shadow">{v}</div>)}</div></section>
      <section><h2 className="text-2xl font-semibold mb-4">Как проходит программа</h2><ol className="list-decimal pl-6 grid gap-2"><li>Диагностика и цели.</li><li>План сопровождения.</li><li>Еженедельные сессии.</li><li>Финальная оценка и рекомендации.</li></ol></section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Специалисты</h2>
        <div className="grid md:grid-cols-3 gap-4">{specialists.slice(0,3).map(s=><div key={s.id} className="bg-white p-5 rounded-2xl shadow"><p className="font-semibold">{s.name}</p><p className="text-sm text-slate-500">{s.position}</p><p className="mt-2 text-sm">{s.description}</p></div>)}</div>
      </section>

      <section><h2 className="text-2xl font-semibold mb-4">Отзывы</h2><div className="grid md:grid-cols-2 gap-4">{reviews.slice(0,4).map(r=><blockquote key={r.id} className="bg-white p-5 rounded-2xl shadow">“{r.text}”<footer className="mt-2 text-sm">— {r.name}</footer></blockquote>)}</div></section>
      <section><h2 className="text-2xl font-semibold mb-4">FAQ</h2><div className="bg-white rounded-2xl p-5 shadow grid gap-2"><p><b>Сколько длится программа?</b> От 6 до 10 недель.</p><p><b>Можно ли онлайн?</b> Да, есть полноценный онлайн формат.</p></div></section>

      <ApplicationForm type="PROGRAM" title="Форма заявки" />

      <section className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow"><h2 className="text-xl font-semibold mb-2">Карта</h2><p>г. Москва, ул. Примерная, 10</p><div className="h-52 mt-3 bg-slate-200 rounded-lg flex items-center justify-center">Map placeholder</div></div>
        <div className="bg-white rounded-2xl p-5 shadow"><h2 className="text-xl font-semibold mb-2">Контакты</h2><p>+7 (999) 000-00-00</p><p>info@future-center.ru</p><p>Пн–Сб: 09:00–21:00</p></div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Блог</h2>
        <div className="grid md:grid-cols-3 gap-4">{posts.slice(0,3).map(p=><Link key={p.id} href={`/blog/${p.slug}`} className="bg-white p-5 rounded-2xl shadow block"><h3 className="font-semibold">{p.title}</h3><p className="text-sm mt-2">{p.excerpt}</p></Link>)}</div>
      </section>
    </div>
  );
}
