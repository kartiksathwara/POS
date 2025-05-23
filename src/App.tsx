import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Customers from "./components/Customers";
import Inventory from "./components/Inventory/Inventory";
// import ActionBar from "./components/SlideBar/ActionBar";
// import MostProduct from "./components/Products/MostProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/customer" element={<Customers />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
    // <MostProduct />
  );
}
export default App;
