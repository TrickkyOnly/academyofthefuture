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
      <section className="glass rounded-3xl p-10 grid gap-4 text-blue-700">
        <h1 className="text-4xl font-bold max-w-2xl">Психологическая помощь подросткам: мягко, научно, эффективно</h1>
        <p className="max-w-2xl">Новый стандарт поддержки подростков и родителей: диагностика, индивидуальные маршруты, онлайн и офлайн сопровождение.</p>
        <div className="flex gap-3">
          <Link href="/programs" className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold">Выбрать программу</Link>
          <Link href="/contacts" className="border border-blue-300 text-blue-700 bg-white/70 px-5 py-3 rounded-xl">Связаться</Link>
        </div>
      </section>

      <section><h2 className="text-2xl font-semibold mb-4 text-blue-700">Преимущества центра</h2><div className="grid md:grid-cols-3 gap-4">{['Команда экспертов','Доказательные практики','Поддержка семьи'].map(v=><div key={v} className="glass-soft p-5 rounded-2xl">{v}</div>)}</div></section>
      <section><h2 className="text-2xl font-semibold mb-4 text-blue-700">Программы</h2><div className="grid md:grid-cols-3 gap-4">{['Индивидуальная','Групповая','Семейная'].map(v=><div key={v} className="glass-soft p-5 rounded-2xl">{v}</div>)}</div></section>
      <section className="glass-soft rounded-2xl p-6"><h2 className="text-2xl font-semibold mb-4 text-blue-700">Как проходит программа</h2><ol className="list-decimal pl-6 grid gap-2"><li>Диагностика и цели.</li><li>План сопровождения.</li><li>Еженедельные сессии.</li><li>Финальная оценка и рекомендации.</li></ol></section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Специалисты</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {specialists.length ? specialists.slice(0, 3).map((s) => (
            <div key={s.id} className="glass-soft p-5 rounded-2xl">{s.photoUrl && <img src={s.photoUrl} alt={s.name} className="w-full h-44 object-cover rounded-xl mb-3" />}<p className="font-semibold">{s.name}</p><p className="text-sm text-blue-600">{s.position}</p><p className="mt-2 text-sm">{s.description}</p></div>
          )) : <div className="glass-soft p-5 rounded-2xl md:col-span-3">Список специалистов загружается.</div>}
        </div>
      </section>

      <section><h2 className="text-2xl font-semibold mb-4 text-blue-700">Отзывы</h2><div className="grid md:grid-cols-2 gap-4">{reviews.length ? reviews.slice(0,4).map(r=><blockquote key={r.id} className="glass-soft p-5 rounded-2xl">“{r.text}”<footer className="mt-2 text-sm">— {r.name}</footer></blockquote>) : <div className="glass-soft p-5 rounded-2xl md:col-span-2">Отзывы скоро появятся.</div>}</div></section>
      <section><h2 className="text-2xl font-semibold mb-4 text-blue-700">FAQ</h2><div className="glass-soft rounded-2xl p-5 grid gap-2"><p><b>Сколько длится программа?</b> От 6 до 10 недель.</p><p><b>Можно ли онлайн?</b> Да, есть полноценный онлайн формат.</p></div></section>

      <ApplicationForm type="PROGRAM" title="Форма заявки" />

      <section className="grid md:grid-cols-2 gap-4">
        <div className="glass-soft rounded-2xl p-5"><h2 className="text-xl font-semibold mb-2 text-blue-700">Карта</h2><p>г. Москва, ул. Примерная, 10</p><iframe className="h-52 mt-3 w-full rounded-lg border border-blue-100" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=37.61%2C55.74%2C37.65%2C55.77&layer=mapnik" /></div>
        <div className="glass-soft rounded-2xl p-5"><h2 className="text-xl font-semibold mb-2 text-blue-700">Контакты</h2><p>+7 (999) 000-00-00</p><p>info@future-center.ru</p><p>Пн–Сб: 09:00–21:00</p></div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Блог</h2>
        <div className="grid md:grid-cols-3 gap-4">{posts.length ? posts.slice(0,3).map(p=><Link key={p.id} href={`/blog/${p.slug}`} className="glass-soft p-5 rounded-2xl block"><h3 className="font-semibold">{p.title}</h3><p className="text-sm mt-2">{p.excerpt}</p></Link>) : <div className="glass-soft p-5 rounded-2xl md:col-span-3">Статьи скоро будут опубликованы.</div>}</div>
      </section>
    </div>
  );
}
