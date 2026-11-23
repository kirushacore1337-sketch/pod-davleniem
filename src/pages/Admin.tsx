import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { adminRequest } from "../lib/api";
import { LogOut, RefreshCw, ShieldCheck, Inbox } from "lucide-react";

type Lead = { id:number; name:string; phone:string; service:string; car?:string; preferred_date?:string; preferred_time?:string; comment?:string; status:string; created_at:string };
type Stats = { total:number; new:number; confirmed:number; done:number };

export function AdminLogin() {
  const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const nav=useNavigate();
  async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");try{const r=await adminRequest<{token:string}>("/api/admin/login","",{method:"POST",body:JSON.stringify({password})});sessionStorage.setItem("pd_admin_token",r.token);nav("/admin");}catch(err){setError(err instanceof Error?err.message:"Не удалось войти");}finally{setBusy(false);}}
  return <div className="admin-login-wrap"><form className="admin-login" onSubmit={submit}><div className="admin-brand"><ShieldCheck size={30}/><span>ПОД ДАВЛЕНИЕМ<small>АДМИНИСТРАТИВНАЯ ПАНЕЛЬ</small></span></div><h1>Вход в систему</h1><label>Пароль администратора<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label>{error&&<p className="form-error">{error}</p>}<button className="button button-primary" disabled={busy}>{busy?"Проверяем...":"Войти"}</button><p className="muted small">Доступ защищён серверной авторизацией. Пароль не хранится в браузере.</p></form></div>;
}

export function AdminDashboard() {
  const nav=useNavigate(); const token=sessionStorage.getItem("pd_admin_token")||"";
  const [leads,setLeads]=useState<Lead[]>([]); const [stats,setStats]=useState<Stats>({total:0,new:0,confirmed:0,done:0}); const [error,setError]=useState(""); const [loading,setLoading]=useState(true);
  async function load(){setLoading(true);setError("");try{const r=await adminRequest<{leads:Lead[];stats:Stats}>("/api/admin/leads",token);setLeads(r.leads);setStats(r.stats);}catch(e){setError(e instanceof Error?e.message:"Ошибка загрузки");if((e instanceof Error)&&e.message.includes("авториза")){sessionStorage.removeItem("pd_admin_token");nav("/admin/login");}}finally{setLoading(false);}}
  useEffect(()=>{if(!token){nav("/admin/login");return;}void load();},[]);
  async function update(id:number,status:string){try{await adminRequest(`/api/admin/leads/${id}` ,token,{method:"PATCH",body:JSON.stringify({status})});await load();}catch(e){setError(e instanceof Error?e.message:"Не удалось обновить заявку");}}
  function logout(){sessionStorage.removeItem("pd_admin_token");nav("/admin/login");}
  return <div className="admin-shell"><aside className="admin-sidebar"><div className="admin-brand"><ShieldCheck/><span>ПОД ДАВЛЕНИЕМ<small>АДМИН-ПАНЕЛЬ</small></span></div><div className="admin-side-active"><Inbox/> Заявки</div><button className="admin-logout" onClick={logout}><LogOut/> Выйти</button></aside><main className="admin-main"><div className="admin-top"><div><p className="eyebrow">УПРАВЛЕНИЕ СЕРВИСОМ</p><h1>Заявки</h1></div><button className="button button-outline" onClick={()=>void load()}><RefreshCw size={16}/> Обновить</button></div><div className="stats-grid"><Stat label="Всего заявок" value={stats.total}/><Stat label="Новые" value={stats.new}/><Stat label="Подтверждены" value={stats.confirmed}/><Stat label="Выполнены" value={stats.done}/></div>{error&&<p className="form-error">{error}</p>}<div className="admin-table-wrap"><div className="admin-table-title"><h2>Последние обращения</h2><span>{leads.length} записей</span></div>{loading?<p className="muted">Загружаем заявки...</p>:leads.length===0?<div className="empty-state"><Inbox size={32}/><p>Пока заявок нет</p></div>:<div className="table-scroll"><table><thead><tr><th>Клиент</th><th>Услуга</th><th>Автомобиль</th><th>Дата</th><th>Статус</th><th>Действия</th></tr></thead><tbody>{leads.map(l=><tr key={l.id}><td><b>{l.name}</b><a href={`tel:${l.phone}`}>{l.phone}</a></td><td>{l.service}</td><td>{l.car||"—"}</td><td>{l.preferred_date||"Не указана"} {l.preferred_time||""}</td><td><span className={`status status-${l.status}`}>{statusLabel(l.status)}</span></td><td className="action-cell"><select value={l.status} onChange={e=>void update(l.id,e.target.value)} aria-label={`Статус заявки ${l.id}`}><option value="new">Новая</option><option value="confirmed">Подтверждена</option><option value="done">Выполнена</option><option value="cancelled">Отменена</option></select></td></tr>)}</tbody></table></div>}</div><p className="admin-footnote">Это первая версия админки: управление заявками и статусами. Управление контентом сайта добавим следующим этапом.</p></main></div>;
}
function Stat({label,value}:{label:string;value:number}){return <div className="stat-card"><span>{label}</span><b>{value}</b></div>}
function statusLabel(s:string){return ({new:"Новая",confirmed:"Подтверждена",done:"Выполнена",cancelled:"Отменена"} as Record<string,string>)[s]||s;}
