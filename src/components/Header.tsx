import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone, CalendarDays, Gauge } from "lucide-react";

const links = [
  ["Главная", "/"], ["Услуги", "/services"], ["Цены", "/prices"],
  ["Оборудование", "/equipment"], ["Галерея", "/gallery"],
  ["Акции", "/offers"], ["О компании", "/about"], ["Контакты", "/contacts"]
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link to="/" className="brand" onClick={() => setOpen(false)}>
      <span className="brand-mark"><Gauge size={25}/></span>
      <span><b>Под <i>Давлением</i></b><small>ШИНОМОНТАЖ В МОСКВЕ</small></span>
    </Link>
    <button className="mobile-menu icon-button" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}>
      {open ? <X/> : <Menu/>}
    </button>
    <nav className={open ? "main-nav is-open" : "main-nav"}>
      {links.map(([label, path]) => <NavLink key={path} to={path} end={path === "/"} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <a className="mobile-phone" href="tel:+74951234567"><Phone size={16}/> +7 (495) 123-45-67</a>
    </nav>
    <div className="header-actions">
      <a className="phone-link" href="tel:+74951234567"><Phone size={16}/><span>+7 (495) 123-45-67<small>Ежедневно: 08:00–23:00</small></span></a>
      <Link className="button button-primary button-small" to="/booking"><CalendarDays size={16}/> Записаться</Link>
    </div>
  </header>;
}
