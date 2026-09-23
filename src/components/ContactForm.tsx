'use client';

import { useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const fd = new FormData(form);
    const subject = encodeURIComponent(String(fd.get('subject')));
    const body = encodeURIComponent(`${fd.get('message')}\n\n${fd.get('name')} <${fd.get('email')}>`);
    // A végleges levélküldő végpont (pl. PHP/Formspree) beállításáig a levelezőprogramot nyitjuk meg.
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setStatus('Az üzenet a levelezőprogramjában nyílik meg – kérjük, onnan küldje el.');
  };
  return (
    <form onSubmit={onSubmit} noValidate>
      <label>Név <input type="text" name="name" required autoComplete="name" /></label>
      <label>E-mail cím <input type="email" name="email" required autoComplete="email" /></label>
      <label>Az üzenet tárgya <input type="text" name="subject" required /></label>
      <label>Üzenet <textarea name="message" rows={7} required /></label>
      <label className="check"><input type="checkbox" name="copy" /> Kérek másolatot a saját címemre</label>
      <button className="btn btn-primary" type="submit">Küldés</button>
      <p className="status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
