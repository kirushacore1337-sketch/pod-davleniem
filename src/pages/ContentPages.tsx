import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Gauge, Wrench, ShieldCheck } from "lucide-react";
import LeadForm from "../components/LeadForm";

const serviceItems = [
  { name: "Шиномонтаж", text: "Демонтаж и монтаж шин, установка колёс и контроль давления.", price: "от 1 500 ₽" },
  { name: "Балансировка колёс", text: "Снижаем вибрации и помогаем продлить срок службы шин.", price: "от 800 ₽" },
  { name: "Ремонт шин", text: "Диагностика повреждений и ремонт в зависимости от состояния шины.", price: "от 1 000 ₽" },
  { name: "Сезонная замена", text: "Переход на летний или зимний комплект по предварительной записи.", price: "от 1 200 ₽" },
  { name: "Хранение шин", text: "Сезонное хранение комплекта. Условия уточняются у администратора.", price: "от 3 000 ₽" }
];

export function Services() {
  return <Page title="Услуги" intro="Комплексный уход за колёсами — от сезонной замены до ремонта шин."><div className="content-card-grid">{serviceItems.map((s) => <article className="content-card" key={s.name}><Gauge/><h3>{s.name}</h3><p>{s.text}</p><strong>{s.price}</strong><Link className="text-link" to="/booking">Записаться <ArrowRight size={15}/></Link></article>)}</div></Page>;
}
export function Prices() {
  return <Page title="Цены" intro="Ориентировочная стоимость популярных услуг. Итоговая цена зависит от диаметра диска, типа автомобиля и сложности работ."><div className="price-table"><div className="price-row price-head"><span>Услуга</span><span>Стоимость от</span></div>{serviceItems.map(s => <div className="price-row" key={s.name}><span>{s.name}</span><strong>{s.price}</strong></div>)}</div><p className="muted small">Цены демонстрационные и должны быть подтверждены владельцем бизнеса до публикации.</p><Link className="button button-primary" to="/booking">Уточнить стоимость</Link></Page>;
}
export function Equipment() { return <Page title="Оборудование" intro="Работаем по технологическим картам и используем профессиональный инструмент."><div className="feature-list">{["Шиномонтажный станок для бережного монтажа","Балансировочный стенд для точной проверки колёс","Компрессор и оборудование для контроля давления","Инструмент для диагностики и ремонта шин"].map(x => <p key={x}><CheckCircle2/>{x}</p>)}</div><p className="notice">Фактические модели оборудования и фотографии необходимо добавить после подтверждения комплектации сервиса.</p></Page>; }
export function Gallery() { return <Page title="Галерея" intro="Здесь будут реальные фотографии сервиса, оборудования и выполненных работ."><div className="gallery-grid">{["Рабочая зона","Шиномонтажное оборудование","Балансировка колёс","Зона ожидания","Инструменты мастера","Сервис снаружи"].map((x,i)=><div className={`gallery-tile gallery-${i+1}`} key={x}><span>{x}</span></div>)}</div><p className="muted small">Замените CSS-заглушки на реальные локальные фотографии в public/images/gallery/.</p></Page>; }
export function Offers() { return <Page title="Акции" intro="Специальные предложения сервиса. Условия и сроки акций должны быть подтверждены перед запуском."><div className="offer-card"><span className="eyebrow">ПРЕДЛОЖЕНИЕ</span><h2>Бесплатная проверка давления</h2><p>Проверим давление в шинах при обращении в сервис.</p><Link className="button button-primary" to="/booking">Записаться</Link></div></Page>; }
export function About() { return <Page title="О компании" intro="«Под Давлением» — проект профессионального шиномонтажа в Москве."><div className="prose"><p>Наша задача — сделать обслуживание колёс понятным, аккуратным и удобным. Мы уделяем внимание состоянию шин, правильной установке и контролю качества выполненных работ.</p><p>Перед публикацией сайта владелец должен заполнить реальные сведения о компании, стаже мастеров, гарантийных условиях и используемом оборудовании.</p></div><div className="feature-list"><p><ShieldCheck/> Ответственный подход к безопасности</p><p><Wrench/> Профессиональный инструмент</p><p><CheckCircle2/> Прозрачное согласование работ</p></div></Page>; }
export function Contacts() { return <Page title="Контакты" intro="Свяжитесь с нами или оставьте заявку на обратный звонок."><div className="contact-layout"><div className="contact-card"><h3>Под Давлением</h3><p>Москва, адрес необходимо указать перед запуском.</p><p><b>Телефон:</b> <a href="tel:+74951234567">+7 (495) 123-45-67</a></p><p><b>График:</b> ежедневно, 08:00–23:00</p><p className="muted small">Контактные данные сейчас демонстрационные.</p></div><div className="map-placeholder"><span>КАРТА ПРОЕЗДА</span><small>Добавьте адрес и карту после выбора помещения</small></div></div></Page>; }
export function Booking() { return <Page title="Запись на шиномонтаж" intro="Заполните форму — администратор свяжется с вами и подтвердит время."><div className="booking-form-card wide"><LeadForm/></div></Page>; }
export function Privacy() { return <Page title="Политика конфиденциальности" intro="Шаблон для согласования с владельцем бизнеса и юристом."><div className="prose"><p>Перед публикацией необходимо разместить юридически корректную политику обработки персональных данных с указанием оператора, целей обработки, состава данных, сроков хранения и способов отзыва согласия.</p><p>Не используйте этот шаблон как окончательный юридический документ без проверки.</p></div></Page>; }

function Page({title,intro,children}:{title:string;intro:string;children:ReactNode}) {
  return <><section className="page-hero"><p className="eyebrow">ПОД ДАВЛЕНИЕМ · МОСКВА</p><h1>{title}</h1><p>{intro}</p></section><section className="section page-content">{children}</section></>;
}
