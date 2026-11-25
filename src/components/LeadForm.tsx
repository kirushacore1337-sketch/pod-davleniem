import { useState } from "react";
import type { FormEvent } from "react";
import { sendLead } from "../lib/api";
import { useSearchParams } from "react-router-dom";
import { LoaderCircle, Send, ShieldCheck } from "lucide-react";

const SERVICE_OPTIONS = [
  "Шиномонтаж",
  "Балансировка колёс",
  "Ремонт шин",
  "Сезонная замена резины",
  "Хранение шин",
  "Другое"
] as const;
type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service");
  const defaultService: ServiceOption = SERVICE_OPTIONS.includes(requestedService as ServiceOption)
    ? (requestedService as ServiceOption)
    : "Шиномонтаж";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError("");
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    if (!payload.consent) { setError("Необходимо согласие на обработку персональных данных."); return; }
    setBusy(true);
    try {
      await sendLead({
        name: payload.name.trim(), phone: payload.phone.trim(), service: payload.service,
        car: payload.car, wheelSize: payload.wheelSize, preferredDate: payload.preferredDate,
        preferredTime: payload.preferredTime, comment: payload.comment
      });
      setDone(true);
      formElement.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Произошла ошибка. Попробуйте ещё раз.");
    } finally { setBusy(false); }
  }

  if (done) return <div className="success-panel"><ShieldCheck size={38}/><h3>Заявка отправлена!</h3><p>Спасибо. Администратор свяжется с вами для подтверждения записи.</p><button className="button button-outline" onClick={() => setDone(false)}>Отправить ещё одну</button></div>;

  return <form className={compact ? "lead-form compact" : "lead-form"} onSubmit={submit}>
    <div className="form-grid">
      <label>Ваше имя<input name="name" placeholder="Как к вам обращаться" required minLength={2} maxLength={80}/></label>
      <label>Телефон<input name="phone" type="tel" placeholder="+7 999 999 99 99" inputMode="tel" autoComplete="tel" pattern="\+?[0-9() .-]{10,23}" title="Например: +7 999 999 99 99" required minLength={10} maxLength={23}/></label>
      <label>Услуга<select name="service" defaultValue={defaultService}>{SERVICE_OPTIONS.map((service) => <option key={service}>{service}</option>)}</select></label>
      <label>Автомобиль<input name="car" placeholder="Например, Kia Sportage" maxLength={100}/></label>
      <label>Размер колёс<select name="wheelSize" defaultValue=""><option value="">Не знаю / уточню</option>{Array.from({length: 13}, (_, i) => <option key={i}>R{i + 13}</option>)}</select></label>
      <label>Желаемая дата<input name="preferredDate" type="date" min={new Date().toISOString().slice(0,10)}/></label>
      <label>Удобное время<input name="preferredTime" type="time"/></label>
      <label className="full-field">Комментарий<textarea name="comment" rows={3} placeholder="Дополнительная информация" maxLength={1000}/></label>
    </div>
    <label className="consent">
      <input name="consent" type="checkbox" required />
      <span>Я согласен(на) на обработку персональных данных согласно политике конфиденциальности.</span>
    </label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-primary" disabled={busy}>{busy ? <LoaderCircle className="spin"/> : <Send size={17}/>} {busy ? "Отправляем..." : "Отправить заявку"}</button>
    <p className="form-note">Отправка заявки не является автоматическим подтверждением записи.</p>
  </form>;
}
