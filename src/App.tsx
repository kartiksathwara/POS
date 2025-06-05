import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Customers from "./components/Customers";
import Settingpage from "./components/Settingpage";
import RequestInventory from "./components/RequestInventory";
import HomePage from "./components/HomePage";
import Inventory from "./components/Inventory";
import LoginPage from "./components/LoginPage";
import DiscountPage from "./components/DiscountPage";
import CancelOrder from "./components/CancelOrder";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/setting" element={<Settingpage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/requestinventory" element={<RequestInventory />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/discount" element={<DiscountPage />} />
        <Route path="/bill" element={<CancelOrder />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
