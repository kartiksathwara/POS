
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Customers from "./components/Customers";
import Lock from "./components/Lock";
import DiscountPage from "./components/DiscountPage";
import CancelOrder from "./components/CancelOrder";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/customer" element={<Customers />} />
        <Route path="/lock" element={<Lock />} />
        <Route path="/discount" element={<DiscountPage />} />
        <Route path="/cancel-order" element={<CancelOrder />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
