<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
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
=======
import Lock from "./components/Lock";

function App() {
  return (
    <>
     <Lock />
    </>
>>>>>>> 51f7f0c (Lock Page)
  )
}

export default App;
