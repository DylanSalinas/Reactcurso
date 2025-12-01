import { useEffect, useState } from "react";
import TankCard from "./TankCard";

function TankList({ nation }) {
  const [tanks, setTanks] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [precios, setPrecios] = useState({});
  const [loading, setLoading] = useState(false); // 👈 spinner

  const API_KEY = import.meta.env.VITE_WOT_KEY;
  const BASE_URL = "https://api.worldoftanks.com"; // NA

  const estimarPrecioPorTier = (tier) => {
    const preciosPorTier = {
      1: 10000, 2: 25000, 3: 40000, 4: 80000, 5: 150000,
      6: 300000, 7: 600000, 8: 1200000, 9: 2500000, 10: 5000000,
    };
    return preciosPorTier[tier] || 0;
  };

  const buscarTanques = async (nombre = "") => {
    try {
      setLoading(true); // empieza spinner
      let url = `${BASE_URL}/wot/encyclopedia/vehicles/?application_id=${API_KEY}`;
      if (nation) url += `&nation=${nation}`;
      if (nombre) url += `&search=${nombre}`;

      console.log("🔗 URL:", url);

      const res = await fetch(url);
      const datos = await res.json();
      console.log("📦 datos:", datos);

      if (datos.status !== "ok") {
        throw new Error("Error de API");
      }

      const lista = Object.values(datos.data || {});

      const p = {};
      lista.forEach(t => {
        p[t.tank_id] = estimarPrecioPorTier(t.tier);
      });

      setPrecios(p);
      setTanks(lista);

    } catch (e) {
      console.error("❌ fallo:", e);
      setTanks([]);
    } finally {
      setLoading(false); // termina spinner
    }
  };

  useEffect(() => {
    buscarTanques();
  }, [nation]);

  const submit = (e) => {
    e.preventDefault();
    buscarTanques(busqueda);
  };

  return (
    <div>
      <form onSubmit={submit} className="buscador">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar tanque..."
        />
        <button type="submit">Buscar</button>
      </form>

      {/* 👇 SPINNER seguro */}
      {loading && <p style={{ textAlign: "center", marginTop: 20 }}>Cargando tanques...</p>}

      <div className="galeria">
        {!loading && tanks.length > 0 ? (
          tanks.map(tank => (
            <TankCard
              key={tank.tank_id}
              tank={tank}
              precio={precios[tank.tank_id]}
            />
          ))
        ) : !loading && (
          <p>No se encontraron tanques 😢</p>
        )}
      </div>
    </div>
  );
}

export default TankList;
