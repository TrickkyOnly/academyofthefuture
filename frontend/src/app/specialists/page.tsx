import { apiGet } from '@/lib/api';
import { Specialist } from '@/types';

export const metadata = { title: 'Специалисты | Центр Будущего' };

export default async function SpecialistsPage() {
  const specialists = await apiGet<Specialist[]>('/specialists').catch(() => []);
  return <div className="container-page py-10"><h1 className="text-3xl font-bold mb-6 text-blue-700">Специалисты</h1><div className="grid md:grid-cols-3 gap-4">{specialists.map(s=><article key={s.id} className="glass-soft rounded-2xl p-5">{s.photoUrl && <img src={s.photoUrl} alt={s.name} className="w-full h-44 object-cover rounded-xl mb-3" />}<h2 className="font-semibold text-blue-700">{s.name}</h2><p className="text-sm text-blue-600">{s.position}</p><p className="mt-2 text-sm">{s.description}</p></article>)}</div></div>;
}
