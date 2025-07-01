import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext"
import ProtectedRoute from "./components/protectedRoute";
import HomePage from "./components/HomePage";
import Settingpage from "./components/Settingpage";
import RequestInventory from "./components/RequestInventory";
import LoginPage from "./components/LoginPage";
import CancelOrder from "./components/CancelOrder";
import Lock from "./components/Lock";
import DiscountPage from "./components/DiscountPage";
import Inventory from "./components/Inventory/Inventory";
import MostProduct from "./components/Products/MostProduct";
import Customers from "./components/Customers";
import Order from "./components/Order";
import Activities from "./components/Activities";
// import ActionBar from "./components/SlideBar/ActionBar";

function App() {
  return (
    <AuthProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>}></Route>
        <Route path="/customer" element={<Customers />} />
        <Route path="/setting" element={<Settingpage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/request" element={<RequestInventory />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bill" element={<CancelOrder />} />
        <Route path="/lock" element={<Lock />} />
        <Route path="/discount" element={<DiscountPage />} />
        <Route path="/most-product" element={<MostProduct />} />
        <Route path="/order" element={<Order />} />
        <Route path="/activity" element={<Activities/>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
