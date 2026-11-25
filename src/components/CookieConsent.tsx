import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, ShieldCheck } from "lucide-react";

type ConsentChoice = "all" | "necessary";
const COOKIE_NAME = "pd_cookie_consent";
const OPEN_EVENT = "pd:open-cookie-settings";

function readChoice(): ConsentChoice | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=(all|necessary)(?:;|$)`));
  return match ? (match[1] as ConsentChoice) : null;
}

function saveChoice(choice: ConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${choice}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readChoice() === null);
    const openSettings = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_EVENT, openSettings);
  }, []);

  function choose(choice: ConsentChoice) {
    saveChoice(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return <aside className="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title">
    <div className="cookie-consent-icon"><Cookie size={24}/></div>
    <div className="cookie-consent-copy">
      <h2 id="cookie-consent-title">Настройки cookie</h2>
      <p>Сайт использует технические cookie, чтобы запомнить ваш выбор. Аналитические и рекламные cookie сейчас не подключены. Подробнее — в <Link to="/privacy#cookies">политике конфиденциальности</Link>.</p>
    </div>
    <div className="cookie-consent-actions">
      <button type="button" className="button button-primary" onClick={() => choose("all")}>Принять все</button>
      <button type="button" className="button button-outline" onClick={() => choose("necessary")}>Только необходимые</button>
    </div>
    <span className="cookie-consent-note"><ShieldCheck size={14}/> Выбор можно изменить внизу сайта</span>
  </aside>;
}
