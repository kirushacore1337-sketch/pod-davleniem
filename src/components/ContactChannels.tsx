import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { CONTACTS } from "../config/contacts";

export default function ContactChannels() {
  return <div className="contact-channels" aria-label="Способы связи">
    <a className="channel whatsapp" href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle/><span>WhatsApp</span></a>
    <a className="channel max" href={CONTACTS.max} target="_blank" rel="noopener noreferrer" aria-label="Написать в MAX">
      <img src="https://max.ru/s/img/big-logo.png" alt="MAX"/><span>MAX</span>
    </a>
    <a className="channel telegram" href={CONTACTS.telegramBot} target="_blank" rel="noopener noreferrer"><Send/><span>Telegram</span></a>
    <a className="channel email" href={`mailto:${CONTACTS.email}`}><Mail/><span>Почта</span></a>
    <a className="channel phone" href={`tel:${CONTACTS.phoneTel}`}><Phone/><span>Телефон</span></a>
  </div>;
}
