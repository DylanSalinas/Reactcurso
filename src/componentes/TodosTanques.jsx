import { useEffect, useState } from "react";
import TankCard from "./TankCard";

function TodosTanques() {
  const [todosLosTanques, setTodosLosTanques] = useState([]);
  const [tanquesFiltrados, setTanquesFiltrados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroNacion, setFiltroNacion] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroTier, setFiltroTier] = useState("");

  // 🔹 Estado de favoritos
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("tanquesFavoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

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

  // 🔹 Cargar todos los tanques
  const cargarTodosLosTanques = async () => {
    try {
      setBuscando(true);
      setError("");

      // Cargar todos los tanques sin filtros
      const url = `${BASE_URL}/wot/encyclopedia/vehicles/?application_id=${API_KEY}`;
      const res = await fetch(url);
      const datos = await res.json();

      if (datos.status !== "ok")
        throw new Error(datos.error?.message || "Error desconocido");
      if (!datos.data) throw new Error("Sin datos de la API");

      const lista = Object.values(datos.data);
      setTodosLosTanques(lista);
      setTanquesFiltrados(lista);
    } catch (e) {
      setError(e.message);
      setTodosLosTanques([]);
      setTanquesFiltrados([]);
    } finally {
      setBuscando(false);
    }
  };

  useEffect(() => {
    cargarTodosLosTanques();
  }, []);

  // 🔹 Función de búsqueda y filtrado
  useEffect(() => {
    let filtrados = [...todosLosTanques];

    // Búsqueda por texto (nombre, nación, tipo)
    if (busqueda.trim()) {
      const busquedaLower = busqueda.toLowerCase();
      filtrados = filtrados.filter((tank) => {
        const nombre = (tank.name || "").toLowerCase();
        const nacion = (tank.nation || "").toLowerCase();
        const tipo = (tank.type || "").toLowerCase();
        const tier = String(tank.tier || "");
        
        return (
          nombre.includes(busquedaLower) ||
          nacion.includes(busquedaLower) ||
          tipo.includes(busquedaLower) ||
          tier.includes(busquedaLower)
        );
      });
    }

    // Filtro por nación
    if (filtroNacion) {
      filtrados = filtrados.filter((tank) => tank.nation === filtroNacion);
    }

    // Filtro por tipo
    if (filtroTipo) {
      const tipoNormalizado = normalizarTipo(filtroTipo);
      filtrados = filtrados.filter((tank) => {
        const tipoTank = normalizarTipo(tank.type);
        return tipoTank === tipoNormalizado;
      });
    }

    // Filtro por tier
    if (filtroTier) {
      filtrados = filtrados.filter((tank) => tank.tier === parseInt(filtroTier));
    }

    setTanquesFiltrados(filtrados);
  }, [busqueda, filtroNacion, filtroTipo, filtroTier, todosLosTanques]);

  // 🔹 Normalizar tipo de tanque
  const normalizarTipo = (apiType) => {
    if (!apiType) return "unknown";
    const t = apiType.toLowerCase();
    if (t.includes("heavy")) return "heavy";
    if (t.includes("medium")) return "medium";
    if (t.includes("light")) return "light";
    if (t.includes("spg")) return apiType === "AT-SPG" ? "AT-SPG" : "SPG";
    return "unknown";
  };

  // 🔹 Función para alternar favorito
  const toggleFavorito = (tank) => {
    const tankId = tank.tank_id;
    const yaEsFavorito = favoritos.some(f => f.tank_id === tankId);
    
    let nuevosFavoritos;
    if (yaEsFavorito) {
      nuevosFavoritos = favoritos.filter(f => f.tank_id !== tankId);
    } else {
      const tanqueCompleto = {
        ...tank,
        precio: estimarPrecioPorTier(tank.tier)
      };
      nuevosFavoritos = [...favoritos, tanqueCompleto];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("tanquesFavoritos", JSON.stringify(nuevosFavoritos));
  };

  // 🔹 Obtener naciones únicas
  const nacionesUnicas = [...new Set(todosLosTanques.map(t => t.nation).filter(Boolean))].sort();

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroNacion("");
    setFiltroTipo("");
    setFiltroTier("");
  };

  return (
    <div className="todos-tanques-container">
      <div className="todos-tanques-header">
        <h2>🔍 Todos los Tanques</h2>
        <span className="todos-tanques-count">
          {tanquesFiltrados.length} de {todosLosTanques.length} tanques
        </span>
      </div>

      {/* Motor de búsqueda */}
      <div className="buscador-avanzado">
        <div className="buscador-principal">
          <input
            type="text"
            placeholder="Buscar por nombre, nación, tipo o tier..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="buscador-input"
          />
          <button
            type="button"
            onClick={limpiarFiltros}
            className="buscador-limpiar-btn"
            title="Limpiar filtros"
          >
            🧹 Limpiar
          </button>
        </div>

        <div className="filtros-container">
          <div className="filtro-group">
            <label>Nación:</label>
            <select
              value={filtroNacion}
              onChange={(e) => setFiltroNacion(e.target.value)}
              className="filtro-select"
            >
              <option value="">Todas</option>
              {nacionesUnicas.map((nacion) => (
                <option key={nacion} value={nacion}>
                  {nacion}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-group">
            <label>Tipo:</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="filtro-select"
            >
              <option value="">Todos</option>
              <option value="heavy">Pesados</option>
              <option value="medium">Medios</option>
              <option value="light">Ligeros</option>
              <option value="AT-SPG">Cazatanques</option>
              <option value="SPG">Artillería</option>
            </select>
          </div>

          <div className="filtro-group">
            <label>Tier:</label>
            <select
              value={filtroTier}
              onChange={(e) => setFiltroTier(e.target.value)}
              className="filtro-select"
            >
              <option value="">Todos</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tier) => (
                <option key={tier} value={tier}>
                  Tier {tier}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading y errores */}
      {buscando && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {error && <p className="error-message">❌ {error}</p>}

      {/* Resultados */}
      {!buscando && tanquesFiltrados.length === 0 && todosLosTanques.length > 0 && (
        <div className="sin-resultados">
          <p>No se encontraron tanques con los filtros seleccionados 😢</p>
          <button onClick={limpiarFiltros} className="limpiar-filtros-btn">
            Limpiar filtros
          </button>
        </div>
      )}

      {!buscando && tanquesFiltrados.length > 0 && (
        <div className="galeria">
          {tanquesFiltrados.map((tank) => (
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
  );
}

export default TodosTanques;


