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
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container-page py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary">Центр Будущего</Link>
        <nav className="flex gap-5 text-sm">
          {nav.map(([title, href]) => (
            <Link key={href} href={href} className="hover:text-primary">
              {title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
