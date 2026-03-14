'use client';

import { useState } from 'react';
import { ApplicationForm } from './ApplicationForm';

export function ConsultationPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors">
        Бесплатная консультация
      </button>
      {open && (
        <div className="fixed inset-0 bg-blue-100/40 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <ApplicationForm type="CONSULTATION" title="Запрос консультации" />
          </div>
        </div>
      )}
    </>
  );
}
