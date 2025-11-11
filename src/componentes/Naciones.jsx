import React, { useEffect, useState } from "react";
import ProductCard from "./TankCard";

const Infaltables = () => {
  const [tragos, setTragos] = useState([]);

  const obtenerInfaltables = async () => {
    try {
      const respuesta = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=daiquiri"
      );
      const datos = await respuesta.json();
      setTragos(Array.isArray(datos.drinks) ? datos.drinks : []);
    } catch (error) {
      console.error("Error al cargar daiquiris:", error);
      setTragos([]);
    }
  };

  useEffect(() => {
    obtenerInfaltables();
  }, []);

  return (
    <div className="container">
      <h2>Infaltables 🍹</h2>
      <p>Los tragos que no pueden faltar en tu colección (¡Daiquiris incluidos!).</p>

      <div className="galeria">
        {tragos.length > 0 ? (
          tragos.map((trago) => {
            const precio = Math.floor(Math.random() * 500) + 300;
            return <ProductCard key={trago.idDrink} trago={trago} precio={precio} />;
          })
        ) : (
          <p>No se encontraron daiquiris 😢</p>
        )}
      </div>
    </div>
  );
};

export default Infaltables;
