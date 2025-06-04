import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext"
import "./App.css";
import Customers from "./components/Customers";
import Inventory from "./components/Inventory/Inventory";
import ProtectedRoute from "./components/protectedRoute";
import HomePage from "./components/HomePage";
import Settingpage from "./components/Settingpage";
import RequestInventory from "./components/RequestInventory";
import LoginPage from "./components/LoginPage";
// import ActionBar from "./components/SlideBar/ActionBar";
// import MostProduct from "./components/Products/MostProduct";

function App() {
  return (
    <AuthProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>}></Route>
        <Route path="/customer" element={<Customers />} />
        <Route path="/setting" element={<Settingpage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/requestinventory" element={<RequestInventory />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    // <MostProduct />
  );
}
export default App;
