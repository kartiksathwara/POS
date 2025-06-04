import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Customers from "./components/Customers";
import Settingpage from "./components/Settingpage";
import RequestInventory from "./components/RequestInventory";
import HomePage from "./components/HomePage";
import Inventory from "./components/Inventory";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/customer" element={<Customers />} />
        <Route path="/setting" element={<Settingpage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/requestinventory" element={<RequestInventory />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;