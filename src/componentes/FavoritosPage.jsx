import { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";

function FavoritosPage() {
  const [favoritos, setFavoritos] = useState([]);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const guardados = localStorage.getItem("tanquesFavoritos");
    setFavoritos(guardados ? JSON.parse(guardados) : []);
  }, []);

  const eliminarFavorito = (tank_id) => {
    const nuevos = favoritos.filter(t => t.tank_id !== tank_id);
    setFavoritos(nuevos);
    localStorage.setItem("tanquesFavoritos", JSON.stringify(nuevos));
  };

  const agregarAlCarritoDesdeFavoritos = (tank) => {
    const producto = {
      tank_id: tank.tank_id,
      name: tank.name,
      image: tank.images?.large || tank.images?.small_icon || tank.image || "https://placehold.co/180x180",
      tier: tank.tier,
      nation: tank.nation,
      type: tank.type,
      precio: tank.precio,
    };
    agregarAlCarrito(producto);
  };

  if (favoritos.length === 0) {
    return (
      <div className="favoritos-vacio">
        <div className="favoritos-vacio-content">
          <h2>❤️ No tenés tanques favoritos</h2>
          <p>Agregá tanques a favoritos desde la lista para verlos acá.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favoritos-container">
      <div className="favoritos-header">
        <h2>❤️ Mis Favoritos</h2>
        <span className="favoritos-count">{favoritos.length} {favoritos.length === 1 ? 'favorito' : 'favoritos'}</span>
      </div>

      <div className="favoritos-lista">
        {favoritos.map((tank) => {
          const imageUrl = tank.images?.large || tank.images?.small_icon || tank.image || "https://placehold.co/180x180";
          return (
            <div key={tank.tank_id} className="favoritos-item">
              <div className="favoritos-item-imagen">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={tank.name || "Tanque sin nombre"}
                    className="favoritos-img"
                  />
                ) : (
                  <div className="favoritos-img-placeholder">
                    <span>Sin imagen</span>
                  </div>
                )}
              </div>

              <div className="favoritos-item-info">
                <h3>{tank.name || "Tanque desconocido"}</h3>
                <div className="favoritos-item-details">
                  <span className="favoritos-badge">Tier {tank.tier ?? "?"}</span>
                  <span className="favoritos-badge">{tank.nation || "?"}</span>
                  <span className="favoritos-badge">{tank.type || "?"}</span>
                </div>
                <p className="favoritos-item-precio">
                  <strong>{(tank.precio ?? 0).toLocaleString()} créditos</strong>
                </p>
              </div>

              <div className="favoritos-item-controls">
                <button
                  className="favoritos-agregar-btn"
                  onClick={() => agregarAlCarritoDesdeFavoritos(tank)}
                  title="Agregar al carrito"
                >
                  🛒 Agregar al carrito
                </button>
                <button
                  className="favoritos-eliminar-btn"
                  onClick={() => eliminarFavorito(tank.tank_id)}
                  title="Quitar de favoritos"
                >
                  ❤️ Quitar de favoritos
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritosPage;
