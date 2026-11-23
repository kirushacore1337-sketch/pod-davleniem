import { ArrowRight, BadgeCheck, Clock3, Gauge, MapPin, ShieldCheck, ThumbsUp, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import LeadForm from "../components/LeadForm";

const services = [
  ["Шиномонтаж", "Демонтаж, монтаж и установка колёс", "от 1 500 ₽", "service-tire"],
  ["Балансировка", "Точная балансировка колёс", "от 800 ₽", "service-balance"],
  ["Ремонт шин", "Устранение проколов и повреждений", "от 1 000 ₽", "service-repair"],
  ["Сезонная замена", "Быстрая смена комплекта резины", "от 1 200 ₽", "service-season"],
  ["Хранение шин", "Сезонное хранение вашего комплекта", "от 3 000 ₽", "service-storage"]
];

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">ПРОФЕССИОНАЛЬНЫЙ ШИНОМОНТАЖ В МОСКВЕ</p>
        <h1>ПОД <span>ДАВЛЕНИЕМ</span></h1>
        <h2>Профессиональный шиномонтаж<br/>в Москве</h2>
        <div className="hero-points"><span><BadgeCheck/> Быстро</span><span><BadgeCheck/> Качественно</span><span><BadgeCheck/> Надёжно</span></div>
        <div className="hero-actions"><Link className="button button-primary" to="/booking">Записаться на шиномонтаж <ArrowRight/></Link><Link className="button button-ghost" to="/about">О сервисе</Link></div>
      </div>
      <div className="hero-image" role="img" aria-label="Автомобиль и комплект шин в профессиональном шиномонтаже"/>
      <div className="hero-bottom"><span><Clock3/> Работаем ежедневно</span><span><ShieldCheck/> Гарантия на работы</span><span><Wrench/> Современное оборудование</span></div>
    </section>

    <section className="section">
      <div className="section-heading"><div><p className="eyebrow">ЧТО МЫ ДЕЛАЕМ</p><h2>Наши <span>услуги</span></h2></div><Link className="text-link" to="/services">Все услуги <ArrowRight size={16}/></Link></div>
      <div className="service-grid">{services.map(([name, desc, price, cls]) => <article className="service-card" key={name}><div className={`service-image ${cls}`}><span className="service-icon"><Gauge/></span></div><div className="service-card-body"><h3>{name}</h3><p>{desc}</p><strong>{price}</strong><Link to="/booking" aria-label={`Записаться: ${name}`}><ArrowRight/></Link></div></article>)}</div>
    </section>

    <section className="section benefits-section">
      <div className="section-heading"><div><p className="eyebrow">НАШ ПОДХОД</p><h2>Почему выбирают <span>нас?</span></h2></div></div>
      <div className="benefit-grid">
        <div className="benefit"><Clock3/><h3>Быстро</h3><p>Работаем по записи и ценим ваше время.</p></div>
        <div className="benefit"><ShieldCheck/><h3>Надёжно</h3><p>Соблюдаем технологию и проверяем результат.</p></div>
        <div className="benefit"><ThumbsUp/><h3>Профессионально</h3><p>Внимательно относимся к каждому автомобилю.</p></div>
        <div className="benefit"><Wrench/><h3>Оборудование</h3><p>Используем профессиональный инструмент.</p></div>
        <div className="benefit"><MapPin/><h3>Удобно</h3><p>Москва. Точный адрес появится после подтверждения.</p></div>
      </div>
    </section>

    <section className="promo-banner"><div><p className="eyebrow">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</p><h2>Проверьте давление<br/>в шинах <span>бесплатно</span></h2><p>Безопасность начинается с правильного давления.</p><Link className="button button-primary" to="/booking">Узнать подробности <ArrowRight/></Link></div><div className="promo-wheel"/></section>

    <section className="section booking-section"><div className="booking-copy"><p className="eyebrow">ОНЛАЙН-ЗАПИСЬ</p><h2>Запишитесь на шиномонтаж <span>прямо сейчас</span></h2><p className="muted">Оставьте заявку. Мы свяжемся с вами, уточним детали и подтвердим удобное время.</p><div className="booking-contact"><PhoneIcon/> <a href="tel:+74951234567">+7 (495) 123-45-67</a></div></div><div className="booking-form-card"><LeadForm compact/></div></section>
  </>;
}
function PhoneIcon(){return <span className="phone-icon">☎</span>}
