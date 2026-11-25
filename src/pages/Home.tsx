import { ArrowRight, BadgeCheck, Clock3, Gauge, MapPin, ShieldCheck, ThumbsUp, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import { CONTACTS } from "../config/contacts";

const services = [
  { name: "Шиномонтаж", formService: "Шиномонтаж", desc: "Демонтаж, монтаж и установка колёс", price: "от 1 500 ₽", image: "services/tire-fitting.webp", alt: "Шиномонтаж колеса" },
  { name: "Балансировка", formService: "Балансировка колёс", desc: "Точная балансировка колёс", price: "от 800 ₽", image: "services/wheel-balancing.webp", alt: "Балансировка автомобильного колеса" },
  { name: "Ремонт шин", formService: "Ремонт шин", desc: "Устранение проколов и повреждений", price: "от 1 000 ₽", image: "services/tire-repair.webp", alt: "Ремонт автомобильной шины" },
  { name: "Сезонная замена", formService: "Сезонная замена резины", desc: "Быстрая смена комплекта резины", price: "от 1 200 ₽", image: "services/seasonal-tire-change.webp", alt: "Смена сезонных шин" },
  { name: "Хранение шин", formService: "Хранение шин", desc: "Сезонное хранение вашего комплекта", price: "от 3 000 ₽", image: "services/tire-storage.webp", alt: "Хранение автомобильных шин" }
];
const asset = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;

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
      <div className="hero-image"><img className="hero-photo" src={asset("hero/hero-main.webp")} alt="Мастер выполняет шиномонтаж автомобиля" fetchPriority="high" /></div>
      <div className="hero-bottom"><span><Clock3/> Работаем ежедневно</span><span><ShieldCheck/> Гарантия на работы</span><span><Wrench/> Современное оборудование</span></div>
    </section>

    <section className="section">
      <div className="section-heading"><div><p className="eyebrow">ЧТО МЫ ДЕЛАЕМ</p><h2>Наши <span>услуги</span></h2></div><Link className="text-link" to="/services">Все услуги <ArrowRight size={16}/></Link></div>
      <div className="service-grid">{services.map((service) => <article className="service-card" key={service.name}><div className="service-image"><img src={asset(service.image)} alt={service.alt} loading="lazy"/><span className="service-icon"><Gauge/></span></div><div className="service-card-body"><h3>{service.name}</h3><p>{service.desc}</p><strong>{service.price}</strong><Link to={`/booking?service=${encodeURIComponent(service.formService)}`} aria-label={`Записаться: ${service.name}`}><ArrowRight/></Link></div></article>)}</div>
    </section>

    <section className="section benefits-section">
      <div className="section-heading"><div><p className="eyebrow">НАШ ПОДХОД</p><h2>Почему выбирают <span>нас?</span></h2></div></div>
      <div className="benefit-grid">
        <article className="benefit">
          <img src={asset("gallery/gallery-04.webp")} alt="Мастер выполняет шиномонтаж колеса" loading="lazy"/>
          <div className="benefit-copy">
            <div className="benefit-icon"><Clock3/><span>01</span></div>
            <h3>Экономим ваше время</h3>
            <p>Работаем по предварительной записи: заранее согласуем время визита, чтобы вам не пришлось долго ждать.</p>
          </div>
        </article>
        <article className="benefit">
          <img src={asset("services/wheel-balancing.webp")} alt="Проверка балансировки автомобильного колеса" loading="lazy"/>
          <div className="benefit-copy">
            <div className="benefit-icon"><ShieldCheck/><span>02</span></div>
            <h3>Внимание к качеству</h3>
            <p>Соблюдаем технологию работ и проверяем результат, прежде чем вернуть автомобиль владельцу.</p>
          </div>
        </article>
        <article className="benefit">
          <img src={asset("about/workshop-equipment.webp")} alt="Профессиональное оборудование шиномонтажа" loading="lazy"/>
          <div className="benefit-copy">
            <div className="benefit-icon"><ThumbsUp/><span>03</span></div>
            <h3>Профессиональный подход</h3>
            <p>Относимся внимательно к каждому автомобилю, диску и шине и подбираем подходящий способ работы.</p>
          </div>
        </article>
        <article className="benefit">
          <img src={asset("about/workshop-interior.webp")} alt="Оснащённая рабочая зона шиномонтажного сервиса" loading="lazy"/>
          <div className="benefit-copy">
            <div className="benefit-icon"><Wrench/><span>04</span></div>
            <h3>Специализированное оборудование</h3>
            <p>Используем оборудование и инструмент, предназначенные для аккуратного монтажа и балансировки колёс.</p>
          </div>
        </article>
        <article className="benefit">
          <img src={asset("promo/promo-car.webp")} alt="Автомобиль в шиномонтажной мастерской" loading="lazy"/>
          <div className="benefit-copy">
            <div className="benefit-icon"><MapPin/><span>05</span></div>
            <h3>Удобно записаться</h3>
            <p>Оставьте заявку онлайн — мы уточним, какая услуга нужна, и поможем согласовать удобное время.</p>
          </div>
        </article>
      </div>
    </section>

    <section className="promo-banner"><div><p className="eyebrow">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</p><h2>Проверьте давление<br/>в шинах <span>бесплатно</span></h2><p>Безопасность начинается с правильного давления.</p><Link className="button button-primary" to="/booking">Узнать подробности <ArrowRight/></Link></div><div className="promo-visual"><img src={asset("promo/promo-car.webp")} alt="Автомобильное колесо в шиномонтажной мастерской" loading="lazy"/></div></section>

    <section className="section booking-section"><div className="booking-copy"><p className="eyebrow">ОНЛАЙН-ЗАПИСЬ</p><h2>Запишитесь на шиномонтаж <span>прямо сейчас</span></h2><p className="muted">Оставьте заявку. Мы свяжемся с вами, уточним детали и подтвердим удобное время.</p><div className="booking-contact"><PhoneIcon/> <a href={`tel:${CONTACTS.phoneTel}`}>{CONTACTS.phoneDisplay}</a></div></div><div className="booking-form-card"><LeadForm compact/></div></section>
  </>;
}
function PhoneIcon(){return <span className="phone-icon">☎</span>}
