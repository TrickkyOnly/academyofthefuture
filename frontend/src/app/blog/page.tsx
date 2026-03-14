import Link from 'next/link';
import { apiGet } from '@/lib/api';
import { BlogPost } from '@/types';

export const metadata = { title: 'Блог | Центр Будущего' };

export default async function BlogPage() {
  const posts = await apiGet<BlogPost[]>('/blog').catch(() => []);
  return <div className="container-page py-10"><h1 className="text-3xl font-bold mb-6">Блог</h1><div className="grid gap-4">{posts.map(p=><Link key={p.id} href={`/blog/${p.slug}`} className="bg-white rounded-2xl p-5 shadow"><h2 className="font-semibold">{p.title}</h2><p className="text-sm mt-2">{p.excerpt}</p></Link>)}</div></div>;
}
