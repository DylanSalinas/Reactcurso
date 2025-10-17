import { useState } from 'react'
import "./App.css";
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
      <Home />
      <Ofertas />
      <Infaltables />
      <ProductList />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
