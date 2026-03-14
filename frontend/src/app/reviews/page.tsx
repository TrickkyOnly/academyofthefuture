import { apiGet } from '@/lib/api';
import { Review } from '@/types';

export const metadata = { title: 'Отзывы | Центр Будущего' };

export default async function ReviewsPage() {
  const reviews = await apiGet<Review[]>('/reviews').catch(() => []);
  return <div className="container-page py-10"><h1 className="text-3xl font-bold mb-6">Отзывы</h1><div className="grid md:grid-cols-2 gap-4">{reviews.map(r=><blockquote key={r.id} className="bg-white rounded-2xl p-5 shadow">“{r.text}”<footer className="text-sm mt-2">— {r.name}</footer></blockquote>)}</div></div>;
}
