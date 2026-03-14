import { apiGet } from '@/lib/api';
import { BlogPost } from '@/types';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await apiGet<BlogPost>(`/blog/${params.slug}`).catch(() => null);
  if (!post) return <div className="container-page py-10">Пост не найден</div>;

  return (
    <article className="container-page py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-slate-700 whitespace-pre-wrap">{post.content}</p>
    </article>
  );
}
