import { useEffect, useState } from "react";
import TankCard from "./TankCard";

function TankList({ nation }) {
  const [tanks, setTanks] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [precios, setPrecios] = useState({});

  const API_KEY = "demo"; // ⚠️ reemplazá por tu API key de Wargaming
  const MOCK_URL = "https://tu-mockapi-url.mockapi.io/tanks"; // ⚠️ poné tu endpoint

  const buscarTanques = async (nombre) => {
    try {
      let url = `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${API_KEY}`;

      if (nation) {
        url += `&nation=${nation}`;
      }

      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      if (!datos.data) throw new Error("Sin datos de la API Wargaming");

      // Convertimos los datos en un array y filtramos si hay búsqueda
      let tanques = Object.values(datos.data);
      if (nombre && nombre.trim() !== "") {
        tanques = tanques.filter((t) =>
          t.name.toLowerCase().includes(nombre.toLowerCase())
        );
      }

      // Generar precios para cada tanque
      const nuevosPrecios = { ...precios };
      tanques.forEach((tank) => {
        if (!nuevosPrecios[tank.tank_id]) {
          nuevosPrecios[tank.tank_id] = Math.floor(Math.random() * 20000) + 10000;
        }
      });

      setPrecios(nuevosPrecios);
      setTanks(tanques);

      // 🔹 Guardar en MockAPI
      await fetch(MOCK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tanques),
      });
    } catch (error) {
      console.error("Error cargando tanques:", error);
      setTanks([]);
    }
  };

  useEffect(() => {
    buscarTanques();
  }, [nation]);

  const manejarSubmit = (e) => {
    e.preventDefault();
    buscarTanques(busqueda);
  };

  return (
    <div>
      {!nation && (
        <form onSubmit={manejarSubmit} className="buscador">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar tanque..."
          />
          <button type="submit">Buscar</button>
        </form>
      )}

      <div className="galeria">
        {tanks.length > 0 ? (
          tanks.map((tank) => (
            <TankCard
              key={tank.tank_id}
              tank={tank}
              precio={precios[tank.tank_id]}
            />
          ))
        ) : (
          <p>No se encontraron tanques 😢</p>
        )}
      </div>
    </div>
  );
}

export default TankList;
