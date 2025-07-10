import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/protectedRoute";
import HomePage from "./components/HomePage";
import Settingpage from "./components/Settingpage";
import RequestInventory from "./components/RequestInventory";
import LoginPage from "./components/LoginPage";
import CancelOrder from "./components/CancelOrder";
import Lock from "./components/Lock";
import DiscountPage from "./components/DiscountPage";
import MostProduct from "./components/Products/MostProduct";
import Customers from "./components/Customers";
import Activities from "./components/Activities";
import Invoice from "./components/Invoice";
import Payment from "./components/Payment";
import { OrderProvider } from "./auth/OrderContext";
import InventoryPage from "./components/Inventory/InventoryPage";
import OrderHistoryViewer from "./components/Order/OrderViewer";
import AddProductForm from "./components/Products/AddProductFrom";
// import ActionBar from "./components/SlideBar/ActionBar";

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/lock"
              element={
                <ProtectedRoute>
                  <Lock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/activities" element={<Activities />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/discount" element={<DiscountPage />} />
            <Route path="/request" element={<RequestInventory />}></Route>
            <Route path="/setting" element={<Settingpage />} />
            <Route path="/bill" element={<CancelOrder />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/payment" element={<Payment />} />
            <Route
              path="/most-product"
              element={
                <ProtectedRoute>
                  <MostProduct />
                </ProtectedRoute>
              }
            />
            <Route path="/order-history" element={<OrderHistoryViewer />} />
            <Route path="/addproduct" element={<AddProductForm />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </AuthProvider>
  );
}
export default App;
