import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import Home from "./pages/Home";
import { About, Booking, Contacts, Equipment, Gallery, Offers, Prices, Privacy, Services } from "./pages/ContentPages";
import { AdminDashboard, AdminLogin } from "./pages/Admin";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return <Routes>
    <Route path="/admin/login" element={<AdminLogin/>}/>
    <Route path="/admin" element={<AdminDashboard/>}/>
    <Route path="*" element={<><ScrollToTop/><Header/><main><Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/prices" element={<Prices/>}/>
      <Route path="/equipment" element={<Equipment/>}/>
      <Route path="/gallery" element={<Gallery/>}/>
      <Route path="/offers" element={<Offers/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contacts" element={<Contacts/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/privacy" element={<Privacy/>}/>
      <Route path="*" element={<Home/>}/>
    </Routes></main><Footer/><CookieConsent/></>}
    />
  </Routes>;
}
