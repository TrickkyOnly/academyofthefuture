import Link from 'next/link';

const nav = [
  ['Программы', '/programs'],
  ['Специалисты', '/specialists'],
  ['Отзывы', '/reviews'],
  ['Блог', '/blog'],
  ['Контакты', '/contacts']
];

export function Header() {
  return (
    <header className="sticky top-0 z-30">
      <div className="container-page py-4">
        <div className="glass rounded-2xl px-5 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-blue-700">Центр Будущего</Link>
          <nav className="flex gap-5 text-sm text-blue-700">
            {nav.map(([title, href]) => (
              <Link key={href} href={href} className="hover:text-blue-500 transition-colors">
                {title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
