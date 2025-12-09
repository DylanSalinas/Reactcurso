import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TankCard from "./TankCard";

const MOCK_API_URL = "https://TU_URL.mockapi.io/tanks";

function TankList() {
  const [tanks, setTanks] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState("");
  
  // 🔹 Estado de favoritos (ahora guarda objetos completos)
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("tanquesFavoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

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
      10: 5000000,
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

      if (datos.status !== "ok")
        throw new Error(datos.error?.message || "Error desconocido");
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

  // ✅ POST A MOCKAPI
  const guardarEnMockAPI = async (tank) => {
    try {
      await fetch(MOCK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tank.name,
          tier: tank.tier,
          type: tank.type,
          nation: tank.nation,
          image: tank.images?.small || "",
          price: estimarPrecioPorTier(tank.tier),
        }),
      });
    } catch (err) {
      console.error("Error guardando en MockAPI", err);
    }
  };

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

  // 🔹 Agrupar por tipo
  const tanquesPorTipo = tanks.reduce((acc, tank) => {
    const t = normalizarTipo(tank.type);
    if (!acc[t]) acc[t] = [];
    acc[t].push(tank);
    return acc;
  }, {});

  const todosTipos = ["heavy", "medium", "light", "AT-SPG", "SPG"];
  const tiposAMostrar = type ? [normalizarTipo(type)] : todosTipos;

  const nombresBonitos = {
    heavy: "Pesados",
    medium: "Medios",
    light: "Ligeros",
    "AT-SPG": "Cazatanques",
    SPG: "Artillería",
  };

  // 🔹 Función para alternar favorito (ahora guarda objetos completos)
  const toggleFavorito = (tank) => {
    const tankId = tank.tank_id;
    const yaEsFavorito = favoritos.some(f => f.tank_id === tankId);
    
    let nuevosFavoritos;
    if (yaEsFavorito) {
      nuevosFavoritos = favoritos.filter(f => f.tank_id !== tankId);
    } else {
      // Guardar objeto completo con precio calculado
      const tanqueCompleto = {
        ...tank,
        precio: estimarPrecioPorTier(tank.tier)
      };
      nuevosFavoritos = [...favoritos, tanqueCompleto];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("tanquesFavoritos", JSON.stringify(nuevosFavoritos));
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
        tiposAMostrar.map(
          (t) =>
            tanquesPorTipo[t]?.length > 0 && (
              <section key={t}>
                <h2>🛡 {nombresBonitos[t]}</h2>
                <div className="galeria">
                  {tanquesPorTipo[t].map((tank) => (
                    <TankCard
                      key={tank.tank_id}
                      tank={tank}
                      precio={estimarPrecioPorTier(tank.tier)}
                      onGuardar={() => guardarEnMockAPI(tank)}
                      esFavorito={favoritos.some(f => f.tank_id === tank.tank_id)}
                      onToggleFavorito={() => toggleFavorito(tank)}
                    />
                  ))}
                </div>
              </section>
            )
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
