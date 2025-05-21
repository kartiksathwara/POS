import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Customers from "./components/Customers";

function App() {
  return (
   
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/customer" element={<Customers />}/>
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
    </BrowserRouter>
  )
}
export default App;
