import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./componentes/Header";
import Home from "./componentes/Home";
import Infaltables from "./componentes/Infaltables";
import Ofertas from "./componentes/Ofertas";
import ProductList from "./componentes/ProductList";
import Login from "./componentes/Login";
import Footer from "./componentes/Footer";

function App() {
  return (
    <div className="App">
      <Header />

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/infaltables" element={<Infaltables />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/administracion" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
