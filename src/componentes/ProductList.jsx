import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ category }) {
  const [tragos, setTragos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const buscarTragos = async (nombre) => {
    let url = "";

    if (category) {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${category}`;
    } else if (nombre && nombre.trim() !== "") {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`;
    } else {
      url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=tequila";
    }

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      // ✅ Si no hay resultados, aseguramos un array vacío
      setTragos(Array.isArray(datos.drinks) ? datos.drinks : []);
    } catch (error) {
      console.error("Error al cargar los tragos:", error);
      setTragos([]); // Por si hay un fallo en la red
    }
  };

  useEffect(() => {
    buscarTragos(category ? "" : busqueda);
  }, [category]);

  const manejarSubmit = (e) => {
    e.preventDefault();
    buscarTragos(busqueda);
  };

  return (
    <div>
      {!category && (
        <form onSubmit={manejarSubmit} className="buscador">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar trago..."
          />
          <button type="submit">Buscar</button>
        </form>
      )}

      <div className="galeria">
        {tragos.length > 0 ? (
          tragos.map((trago) => {
            const precio = Math.floor(Math.random() * 500) + 300;
            return <ProductCard key={trago.idDrink} trago={trago} precio={precio} />;
          })
        ) : (
          <p>No se encontraron tragos 😢</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
