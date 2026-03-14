import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ConsultationPopup } from '@/components/ConsultationPopup';

export const metadata: Metadata = {
  title: 'Центр Будущего — психологическая помощь подросткам',
  description: 'Современный центр психологической помощи подросткам и их семьям.',
  openGraph: {
    title: 'Центр Будущего',
    description: 'Психологическая помощь подросткам и родителям',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Центр Будущего',
    medicalSpecialty: 'Psychology',
    telephone: '+79990000000'
  };

  return (
    <html lang="ru">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <ConsultationPopup />
      </body>
    </html>
  );
}
