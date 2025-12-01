import { useContext } from "react";
import { CartContext } from "../componentes/CartContext"; // 📁 ruta correcta

function Carrito() {
  const ctx = useContext(CartContext);

  // ✅ Si el contexto no está cargado todavía
  if (!ctx) {
    return <p>Cargando carrito...</p>;
  }

  const { carrito = [], eliminarDelCarrito, vaciarCarrito } = ctx;

  // ✅ proteger reduce por si cantidad/precio no existen
  const total = carrito.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.cantidad || 1),
    0
  );

  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>🛒 Tu carrito está vacío</h2>
        <p>Agregá tanques desde la lista para verlos acá.</p>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>🛒 Tu carrito</h2>

      <ul className="carrito-lista">
        {carrito.map((item) => (
          <li
            key={item.tank_id || item.id}
            className="carrito-item"
          >

            {/* ✅ Si la imagen no existe */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.name || "Tanque sin nombre"}
                width="80"
              />
            ) : (
              <div className="imagen-placeholder" style={{ width: 80, height: 50 }}>
                Sin imagen
              </div>
            )}

            <div>
              <h3>{item.name || "Tanque desconocido"}</h3>

              <p>
                Tier: {item.tier ?? "?"} | Nación: {item.nation || "?"}
              </p>

              {/* ✅ Si precio es undefined */}
              <p>Precio: {(item.precio ?? 0).toLocaleString()} créditos</p>

              {/* ✅ Si cantidad es undefined */}
              <p>Cantidad: {item.cantidad ?? 1}</p>
            </div>

            <button onClick={() => eliminarDelCarrito(item.tank_id || item.id)}>
              ❌ Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="carrito-total">
        <h3>Total: {total.toLocaleString()} créditos</h3>
        <button onClick={vaciarCarrito}>🧹 Vaciar carrito</button>
      </div>
    </div>
  );
}

export default Carrito;
