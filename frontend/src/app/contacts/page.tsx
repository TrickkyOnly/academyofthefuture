import { ApplicationForm } from '@/components/ApplicationForm';

export const metadata = { title: 'Контакты | Центр Будущего' };

export default function ContactsPage() {
  return (
    <div className="container-page py-10 grid gap-6">
      <ApplicationForm type="ONLINE_BOOKING" title="Онлайн запись" />
      <section className="bg-white rounded-2xl p-6 shadow">
        <h1 className="text-3xl font-bold mb-4">Контакты</h1>
        <p>Телефон: +7 (999) 000-00-00</p>
        <p>Email: info@future-center.ru</p>
        <p>Адрес: г. Москва, ул. Примерная, 10</p>
      </section>
      <ApplicationForm type="CALLBACK" title="Форма обратного звонка" />
    </div>
  );
}
