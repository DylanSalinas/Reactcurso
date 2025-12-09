import { Link } from "react-router-dom";

function Tiers() {
  const tiers = [1,2,3,4,5,6,7,8,9,10];

  // 🔹 Tipos con key exacta de la API, nombre bonito e icono
  const tipos = [
    { key: "heavy", nombre: "Pesados", icono: "🛡️" },
    { key: "medium", nombre: "Medios", icono: "⚔️" },
    { key: "light", nombre: "Ligeros", icono: "⚡" },
    { key: "AT-SPG", nombre: "Cazatanques", icono: "🎯" },
    { key: "SPG", nombre: "Artillería", icono: "💣" }
  ];

  // 🔹 Función para obtener color según tier (todos usan el color del tier 10)
  const getTierColor = (tier) => {
    // Todos los tiers usan el mismo color que el tier 10
    return "#0f4f0f";
  };

  return (
    <section className="tiers-section">
      <div className="tiers-header">
        <h2>🔥 Tiers</h2>
        <p className="tiers-subtitle">Explorá tanques por nivel y tipo</p>
      </div>
      
      {tiers.map((tier) => (
        <div key={tier} className="tier-group" style={{ borderColor: getTierColor(tier) }}>
          <div className="tier-group-header" style={{ borderLeftColor: getTierColor(tier) }}>
            <h3 className="tier-title">
              <span className="tier-badge" style={{ 
                backgroundColor: getTierColor(tier),
                boxShadow: `0 4px 12px rgba(0, 0, 0, 0.6), 0 0 20px ${getTierColor(tier)}40`
              }}>
                ⭐ Tier {tier}
              </span>
            </h3>
          </div>
          <div className="galeria tiers-galeria">
            {tipos.map((tipo) => (
              <Link 
                key={tipo.key} 
                to={`/tanques?tier=${tier}&type=${tipo.key}`}
                className="tier-card-link"
              >
                <div className="tier-card">
                  <div className="tier-card-icon">{tipo.icono}</div>
                  <div className="tier-card-content">
                    <h4 className="tier-card-title">{tipo.nombre}</h4>
                    <p className="tier-card-subtitle">Tier {tier}</p>
                  </div>
                  <div className="tier-card-arrow">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Tiers;
