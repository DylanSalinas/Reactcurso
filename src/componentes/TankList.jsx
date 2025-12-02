import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TankCard from "./TankCard";

function TankList() {
  const [tanks, setTanks] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState("");

  const [params] = useSearchParams();
  const nation = params.get("nation");
  const tier = params.get("tier");
  const type = params.get("type");

  const API_KEY = import.meta.env.VITE_WOT_KEY;
  const BASE_URL = "https://api.worldoftanks.com";

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
      10: 5000000
    };
    return preciosPorTier[tier] || 0;
  };

  const buscarTanques = async (search = "") => {
    try {
      setBuscando(true);
      setError("");

      let url = `${BASE_URL}/wot/encyclopedia/vehicles/?application_id=${API_KEY}`;
      if (nation) url += `&nation=${nation}`;
      if (tier) url += `&tier=${tier}`;
      if (search) url += `&search=${search}`;

      const res = await fetch(url);
      const datos = await res.json();

      if (datos.status !== "ok") throw new Error(datos.error?.message || "Error desconocido");
      if (!datos.data) throw new Error("Sin datos de la API");

      setTanks(Object.values(datos.data));
    } catch (e) {
      setError(e.message);
      setTanks([]);
    } finally {
      setBuscando(false);
    }
  };

  useEffect(() => {
    buscarTanques();
  }, [nation, tier, type]);

  // 🔹 Normalizamos tipo de tanque
  const normalizarTipo = (apiType) => {
    if (!apiType) return "unknown";
    const t = apiType.toLowerCase();
    if (t.includes("heavy")) return "heavy";
    if (t.includes("medium")) return "medium";
    if (t.includes("light")) return "light";
    if (t.includes("spg")) return apiType === "AT-SPG" ? "AT-SPG" : "SPG";
    return "unknown";
  };

  // 🔹 Agrupar por tipo usando la normalización
  const tanquesPorTipo = tanks.reduce((acc, tank) => {
    const t = normalizarTipo(tank.type);
    if (!acc[t]) acc[t] = [];
    acc[t].push(tank);
    return acc;
  }, {});

  // 🔹 Tipos a mostrar
  const todosTipos = ["heavy", "medium", "light", "AT-SPG", "SPG"];
  const tiposAMostrar = type ? [normalizarTipo(type)] : todosTipos;

  const nombresBonitos = {
    heavy: "Pesados",
    medium: "Medios",
    light: "Ligeros",
    "AT-SPG": "Cazatanques",
    SPG: "Artillería"
  };

  return (
    <div>
      {!type && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            buscarTanques(e.target.search.value);
          }}
          className="buscador"
        >
          <input name="search" placeholder="Buscar tanque..." />
          <button>Buscar</button>
        </form>
      )}

      {buscando && <Spinner />}

      {error && <p>❌ {error}</p>}

      {tanks.length > 0 ? (
        tiposAMostrar.map((t) =>
          tanquesPorTipo[t] && tanquesPorTipo[t].length > 0 ? (
            <section key={t}>
              <h2>🛡 {nombresBonitos[t]}</h2>
              <div className="galeria">
                {tanquesPorTipo[t].map((tank) => (
                  <TankCard
                    key={tank.tank_id}
                    tank={tank}
                    precio={estimarPrecioPorTier(tank.tier)}
                  />
                ))}
              </div>
            </section>
          ) : null
        )
      ) : (
        !buscando && <p>No se encontraron tanques 😢</p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

export default TankList;
