import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./components/Customers";
import Settingpage from "./components/Settingpage";
import RequestInventory from "./components/RequestInventory";
import HomePage from "./components/HomePage";
import Inventory from "./components/Inventory";
import CancelOrder from "./components/CancelOrder";
import Lock from "./components/Lock";
import DiscountPage from "./components/DiscountPage";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/requestinventory" element={<RequestInventory />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="lock" element={<Lock />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/setting" element={<Settingpage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/discount" element={<DiscountPage />} />
        <Route path="/bill" element={<CancelOrder /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
