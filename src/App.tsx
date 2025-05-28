
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Lock from "./components/Lock";
import DiscountPage from "./components/DiscountPage";
import CancelOrder from "./components/CancelOrder";
import PaymentPageOne from "./components/PaymentPageOne";


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/lock" element={<Lock />} />
        <Route path="/discount" element={<DiscountPage />} />
        <Route path="/checkout-1" element={<CancelOrder />} />
        <Route path="/checkout-2" element={<PaymentPageOne />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
