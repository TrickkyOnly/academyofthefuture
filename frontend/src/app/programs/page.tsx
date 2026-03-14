import { apiGet } from '@/lib/api';

export const metadata = { title: 'Программы | Центр Будущего' };

export default async function ProgramsPage() {
  const programs = await apiGet<{slug:string;title:string;duration:string}[]>('/programs').catch(() => []);
  return <div className="container-page py-10"><h1 className="text-3xl font-bold mb-6">Программы</h1><div className="grid md:grid-cols-3 gap-4">{programs.map(p=><article key={p.slug} className="bg-white rounded-2xl p-5 shadow"><h2 className="font-semibold">{p.title}</h2><p className="text-sm mt-2">Длительность: {p.duration}</p></article>)}</div></div>;
}
