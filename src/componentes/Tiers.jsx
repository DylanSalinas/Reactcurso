import React, { useEffect, useState } from "react";
import ProductCard from "./TankCard";

const Ofertas = () => {
  const [tragos, setTragos] = useState([]);

  const obtenerOfertas = async () => {
    try {
      const respuesta = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
      );
      const datos = await respuesta.json();
      setTragos(Array.isArray(datos.drinks) ? datos.drinks : []);
    } catch (error) {
      console.error("Error al cargar margaritas:", error);
      setTragos([]);
    }
  };

  useEffect(() => {
    obtenerOfertas();
  }, []);

  return (
    <div className="container">
      <h2>Ofertas 🔥</h2>
      <p>Descubrí descuentos en tragos seleccionados (¡2 x1 en Margaritas!).</p>

      <div className="galeria">
        {tragos.length > 0 ? (
          tragos.map((trago) => {
            const precio = Math.floor(Math.random() * 500) + 300;
            return <ProductCard key={trago.idDrink} trago={trago} precio={precio} />;
          })
        ) : (
          <p>No se encontraron margaritas 😢</p>
        )}
      </div>
    </div>
  );
};

export default Ofertas;
