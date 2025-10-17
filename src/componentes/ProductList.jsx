import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [tragos, setTragos] = useState([]);
  const [busqueda, setBusqueda] = useState("margarita");

  const buscarTragos = async (nombre) => {
    const respuesta = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`
    );
    const datos = await respuesta.json();
    setTragos(datos.drinks || []);
  };

  useEffect(() => {
    buscarTragos(busqueda);
  }, []);

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== "") buscarTragos(busqueda);
  };

  return (
    <div>
      <form onSubmit={manejarSubmit} className="buscador">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar trago..."
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="galeria">
        {tragos.length > 0 ? (
          tragos.map((trago) => (
            <ProductCard key={trago.idDrink} trago={trago} />
          ))
        ) : (
          <p>No se encontraron tragos 😢</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
