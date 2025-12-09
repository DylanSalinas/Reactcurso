import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import TankCard from "./TankCard";
import { CartContext } from "../componentes/CartContext";

export default function Naciones() {
  const [params] = useSearchParams();
  const nationSeleccionada = params.get("nation");

  const [tanks, setTanks] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [abiertos, setAbiertos] = useState({}); // 👈 controla qué tiers están abiertos

  // 🔹 Estado de favoritos (guarda objetos completos)
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("tanquesFavoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const { agregarAlCarrito } = useContext(CartContext);

  const API_KEY = import.meta.env.VITE_WOT_KEY;
  const BASE_URL = "https://api.worldoftanks.com";

  const naciones = [
    { id: "usa",  name: "Estados Unidos", flag: "https://flagcdn.com/us.svg" },
    { id: "germany",  name: "Alemania", flag: "https://flagcdn.com/de.svg" },
    { id: "ussr",  name: "URSS", flag: "https://flagcdn.com/ru.svg" },
    { id: "uk", name: "Reino Unido", flag: "https://flagcdn.com/gb.svg" },
    { id: "france",  name: "Francia", flag: "https://flagcdn.com/fr.svg" },
    { id: "japan",  name: "Japón", flag: "https://flagcdn.com/jp.svg" },
    { id: "czech",  name: "Checoslovaquia", flag: "https://flagcdn.com/cz.svg" },
    { id: "italy", name: "Italia", flag: "https://flagcdn.com/it.svg" },
    { id: "china", name: "China", flag: "https://flagcdn.com/cn.svg" },
    { id: "sweden", name: "Suecia", flag: "https://flagcdn.com/se.svg" },
    { id: "poland", name: "Polonia", flag: "https://flagcdn.com/pl.svg" }
  ];

  // 🌀 spinner visual durante la carga
  const Spinner = () => (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );

  const obtenerTanques = async () => {
    try {
      setCargando(true);
      setError("");

      const url = `${BASE_URL}/wot/encyclopedia/vehicles/?application_id=${API_KEY}&nation=${nationSeleccionada}`;
      console.log("🔗 Consultando:", url);

      const res = await fetch(url);
      const datos = await res.json();

      if (datos.status !== "ok") throw new Error(datos.error?.message || "Error API");
      if (!datos.data) throw new Error("Sin datos de la API");

      const lista = Object.values(datos.data);
      setTanks(lista);

      // 🧩 inicializa todos los tiers como cerrados
      const inicial = {};
      lista.forEach(t => {
        const tier = t.tier ?? 0;
        inicial[tier] = false;
      });
      setAbiertos(inicial);
    } catch (e) {
      setError("Error cargando tanques");
      setTanks([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (nationSeleccionada) {
      obtenerTanques();
    }
  }, [nationSeleccionada]);

  const toggle = (tier) => {
    setAbiertos(prev => ({
      ...prev,
      [tier]: !prev[tier]
    }));
  };

  // 🔹 Función para alternar favorito
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

  if (!nationSeleccionada) {
    return (
      <section>
        <h2>🌍 Naciones</h2>
        <div className="galeria">
          {naciones.map(n => (
            <Link key={n.id} to={`?nation=${n.id}`}>
              <div className="card">
                <div className="img-container">
                  <img src={n.flag} alt={n.name} className="tank-img" />
                </div>
                <h3>{n.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  const bloques = {};
  tanks.forEach(t => {
    const tier = t.tier ?? 0;
    if (!bloques[tier]) bloques[tier] = [];
    bloques[tier].push(t);
  });

  const nacionObj = naciones.find(n => n.id === nationSeleccionada);

  return (
    <section>
      <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <img src={nacionObj?.flag} width="60" />
        {nacionObj?.name}
      </h2>

      {cargando && <Spinner />}
      {error && <p>❌ {error}</p>}

      {!cargando && tanks.length > 0 && Object.keys(bloques).sort((a,b) => a-b).map(tier => (
        <div key={tier} className="tier-seccion">
          <h3 onClick={() => toggle(tier)} className="tier-title">
            {abiertos[tier] ? "▼" : "▶"} Tier {tier}
          </h3>

          {abiertos[tier] && (
            <div className="galeria">
              {bloques[tier].map(tank => (
                <TankCard 
                  key={tank.tank_id} 
                  tank={tank} 
                  precio={estimarPrecioPorTier(tank.tier)}
                  esFavorito={favoritos.some(f => f.tank_id === tank.tank_id)}
                  onToggleFavorito={() => toggleFavorito(tank)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

// 💰 función sacada del componente para reusarla sin romper
function estimarPrecioPorTier(tier) {
  const precios = {
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
  return precios[tier] || 0;
}
