import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./componentes/Header";
import Home from "./componentes/Home";
import Naciones from "./componentes/Naciones";
import Tiers from "./componentes/Tiers";
import TankList from "./componentes/TankList";
import Login from "./componentes/Login";
import Footer from "./componentes/Footer";
import Carrito from "./componentes/Carrito";


import { CartProvider } from "./componentes/CartContext"; 

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tiers" element={<Tiers />} />
          <Route path="/naciones" element={<Naciones />} />
          <Route path="/tanques" element={<TankList />} />
          <Route path="/administracion" element={<Login />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
