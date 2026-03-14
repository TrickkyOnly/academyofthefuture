import { apiGet } from '@/lib/api';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await apiGet<{ title: string; metaTitle?: string; metaDesc?: string }>(`/services/${params.slug}`).catch(() => null);
  return {
    title: page?.metaTitle || page?.title || 'Услуга',
    description: page?.metaDesc || 'SEO страница услуги'
  };
}

export default async function ServiceSeoPage({ params }: { params: { slug: string } }) {
  const page = await apiGet<{ title: string; content: string }>(`/services/${params.slug}`).catch(() => null);
  if (!page) return <div className="container-page py-10">Услуга не найдена.</div>;
  return <div className="container-page py-10"><h1 className="text-3xl font-bold mb-4">{page.title}</h1><p className="whitespace-pre-wrap">{page.content}</p></div>;
}
