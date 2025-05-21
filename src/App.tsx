import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import HomePage from "./components/HomePage";
import Customers from "./components/Customers";

function App() {
  return (
   
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/customer" element={<Customers />}/>
        </Routes>
    </BrowserRouter>
  )
=======
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <>
      <LoginPage />
    </>
  );
>>>>>>> 4b6a002 (login Page)
}

export default App;
