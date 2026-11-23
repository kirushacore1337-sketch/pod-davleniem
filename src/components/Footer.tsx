import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Send } from "lucide-react";

export default function Footer() {
  return <footer className="footer">
    <div className="footer-grid">
      <div><Link to="/" className="brand"><span className="brand-mark"><span>ПД</span></span><span><b>Под <i>Давлением</i></b><small>ШИНОМОНТАЖ В МОСКВЕ</small></span></Link><p className="muted">Профессиональный шиномонтаж. Быстро, качественно, надёжно.</p></div>
      <div><h4>Навигация</h4><Link to="/services">Услуги</Link><Link to="/prices">Цены</Link><Link to="/equipment">Оборудование</Link><Link to="/offers">Акции</Link></div>
      <div><h4>Контакты</h4><p><MapPin size={15}/> Москва, адрес уточняется</p><a href="tel:+74951234567"><Phone size={15}/> +7 (495) 123-45-67</a><p><Clock size={15}/> Ежедневно: 08:00–23:00</p></div>
      <div><h4>Запись</h4><p className="muted">Оставьте заявку — мы перезвоним и подтвердим удобное время.</p><Link className="button button-outline" to="/booking">Оставить заявку <Send size={15}/></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} «Под Давлением». Все права защищены.</span><Link to="/privacy">Политика конфиденциальности</Link><Link to="/admin/login">Вход для администратора</Link></div>
  </footer>;
}
