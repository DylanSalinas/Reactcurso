import { Link } from "react-router-dom";

function Tiers() {
  const tiers = [1,2,3,4,5,6,7,8,9,10];

  // 🔹 Tipos con key exacta de la API y nombre bonito
  const tipos = [
    { key: "heavy", nombre: "Pesados" },
    { key: "medium", nombre: "Medios" },
    { key: "light", nombre: "Ligeros" },
    { key: "AT-SPG", nombre: "Cazatanques" },
    { key: "SPG", nombre: "Artillería" }
  ];

  return (
    <section className="ofertas">
      <h2>🔥 Tiers</h2>
      {tiers.map((tier) => (
        <div key={tier}>
          <h3>Tier {tier}</h3>
          <div className="galeria">
            {tipos.map((tipo) => (
              <Link key={tipo.key} to={`/tanques?tier=${tier}&type=${tipo.key}`}>
                <div className="card">
                  <p>{tipo.nombre}</p>
                  <p>Ver tanques de Tier {tier}</p>
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
