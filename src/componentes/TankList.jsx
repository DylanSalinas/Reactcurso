import { useEffect, useState } from "react";
import TankCard from "./TankCard";

function TankList({ nation }) {
  const [tanks, setTanks] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [precios, setPrecios] = useState({});

  const API_KEY = import.meta.env.VITE_WOT_KEY;
  const REGION = import.meta.env.VITE_WOT_REGION || "eu";
  const BASE_URL = `https://api.worldoftanks.${REGION}`;
  const MOCK_URL = "https://tu-mockapi-url.mockapi.io/tanks"; // ⚠️ tu endpoint

  const estimarPrecioPorTier = (tier) => {
    const preciosPorTier = {
      1: 10000,
      2: 25000,
      3: 40000,
      4: 80000,
      5: 150000,
      6: 300000,
      7: 600000,
      8: 1200000,
      9: 2500000,
      10: 5000000,
    };
    return preciosPorTier[tier] || 0;
  };

  const buscarTanques = async (nombre) => {
    try {
      let url = `${BASE_URL}/wot/encyclopedia/vehicles/?application_id=${API_KEY}`;
      if (nation) url += `&nation=${nation}`;

      // 👇 Agregamos logs para depurar
      console.log("🔗 URL solicitada:", url);

      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      console.log("📦 Respuesta completa:", datos);

      // Validamos la respuesta
      if (!datos.status || datos.status !== "ok") {
        throw new Error(`Error de API: ${datos.error?.message || "Respuesta inválida"}`);
      }

      if (!datos.data) throw new Error("Sin datos de la API de Wargaming");

      let tanques = Object.values(datos.data);

      if (nombre && nombre.trim() !== "") {
        tanques = tanques.filter((t) =>
          t.name.toLowerCase().includes(nombre.toLowerCase())
        );
      }

      const nuevosPrecios = { ...precios };
      tanques.forEach((tank) => {
        if (!nuevosPrecios[tank.tank_id]) {
          nuevosPrecios[tank.tank_id] = estimarPrecioPorTier(tank.tier);
        }
      });

      setPrecios(nuevosPrecios);
      setTanks(tanques);
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
