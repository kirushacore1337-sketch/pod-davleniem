import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { About, Booking, Contacts, Equipment, Gallery, Offers, Prices, Privacy, Services } from "./pages/ContentPages";
import { AdminDashboard, AdminLogin } from "./pages/Admin";

export default function App() {
  return <Routes>
    <Route path="/admin/login" element={<AdminLogin/>}/>
    <Route path="/admin" element={<AdminDashboard/>}/>
    <Route path="*" element={<><Header/><main><Routes>
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
    </Routes></main><Footer/></>}
    />
  </Routes>;
}
