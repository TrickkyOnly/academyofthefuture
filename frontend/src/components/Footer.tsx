export function Footer() {
  return (
    <footer className="mt-16">
      <div className="container-page pb-10">
        <div className="glass rounded-2xl px-6 py-8 text-blue-700 text-sm grid gap-2">
          <p>© {new Date().getFullYear()} Центр психологической помощи подросткам «Будущее».</p>
          <p>Телефон: +7 (999) 000-00-00 · Email: info@future-center.ru</p>
        </div>
      </div>
    </footer>
  );
}
