import { useState } from 'react'
import "./App.css";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="App">
      <h1>Galería de Tragos 🍸</h1>
      <ProductList />
    </div>
  );
}

export default App;

