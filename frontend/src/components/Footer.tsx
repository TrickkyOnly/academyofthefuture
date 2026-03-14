export function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-200">
      <div className="container-page py-10 grid gap-3 text-sm">
        <p>© {new Date().getFullYear()} Центр психологической помощи подросткам «Будущее».</p>
        <p>Телефон: +7 (999) 000-00-00 · Email: info@future-center.ru</p>
      </div>
    </footer>
  );
}
