import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./componentes/Header";
import Home from "./componentes/Home";
import Naciones from "./componentes/Naciones";
import Tiers from "./componentes/Tiers";
import TankList from "./componentes/TankList";
import TodosTanques from "./componentes/TodosTanques";
import Login from "./componentes/Login";
import Footer from "./componentes/Footer";
import Carrito from "./componentes/Carrito";
import FavoritosPage from "./componentes/FavoritosPage"; // ✅ importar la página de favoritos

import { CartProvider } from "./componentes/CartContext";
import { AuthProvider } from "./componentes/AuthContext";
import PrivateRoute from "./componentes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Header />

          <Routes>
            {/* públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/tiers" element={<Tiers />} />
            <Route path="/naciones" element={<Naciones />} />
            <Route path="/tanques" element={<TankList />} />
            <Route path="/todos-tanques" element={<TodosTanques />} />
            <Route path="/favoritos" element={<FavoritosPage />} /> {/* ✅ nueva ruta */}
            <Route path="/login" element={<Login />} />

            {/* protegidas */}
            <Route
              path="/administracion"
              element={
                <PrivateRoute>
                  <Carrito />
                </PrivateRoute>
              }
            />
            <Route
              path="/carrito"
              element={
                <PrivateRoute>
                  <Carrito />
                </PrivateRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
