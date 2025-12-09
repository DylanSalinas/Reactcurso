import { useContext } from "react";
import { CartContext } from "../componentes/CartContext";

function Carrito() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    return <p>Cargando carrito...</p>;
  }

  const { carrito = [], eliminarDelCarrito, actualizarCantidad, vaciarCarrito } = ctx;

  // ✅ proteger reduce por si cantidad/precio no existen
  const total = carrito.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.cantidad || 1),
    0
  );

  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <div className="carrito-vacio-content">
          <h2>🛒 Tu carrito está vacío</h2>
          <p>Agregá tanques desde la lista para verlos acá.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h2>🛒 Tu Carrito</h2>
        <span className="carrito-count">{carrito.length} {carrito.length === 1 ? 'artículo' : 'artículos'}</span>
      </div>

      <div className="carrito-lista">
        {carrito.map((item) => {
          const subtotal = (item.precio || 0) * (item.cantidad || 1);
          return (
            <div key={item.tank_id || item.id} className="carrito-item">
              <div className="carrito-item-imagen">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || "Tanque sin nombre"}
                    className="carrito-img"
                  />
                ) : (
                  <div className="carrito-img-placeholder">
                    <span>Sin imagen</span>
                  </div>
                )}
              </div>

              <div className="carrito-item-info">
                <h3>{item.name || "Tanque desconocido"}</h3>
                <div className="carrito-item-details">
                  <span className="carrito-badge">Tier {item.tier ?? "?"}</span>
                  <span className="carrito-badge">{item.nation || "?"}</span>
                  <span className="carrito-badge">{item.type || "?"}</span>
                </div>
                <p className="carrito-item-precio-unitario">
                  {(item.precio ?? 0).toLocaleString()} créditos c/u
                </p>
              </div>

              <div className="carrito-item-controls">
                <div className="cantidad-controls">
                  <button
                    className="cantidad-btn"
                    onClick={() => actualizarCantidad(item.tank_id || item.id, (item.cantidad || 1) - 1)}
                  >
                    −
                  </button>
                  <span className="cantidad-value">{item.cantidad ?? 1}</span>
                  <button
                    className="cantidad-btn"
                    onClick={() => actualizarCantidad(item.tank_id || item.id, (item.cantidad || 1) + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="carrito-item-subtotal">
                  <strong>{subtotal.toLocaleString()} créditos</strong>
                </div>
                <button
                  className="carrito-eliminar-btn"
                  onClick={() => eliminarDelCarrito(item.tank_id || item.id)}
                  title="Eliminar del carrito"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="carrito-footer">
        <div className="carrito-total">
          <div className="carrito-total-info">
            <span className="carrito-total-label">Total:</span>
            <span className="carrito-total-amount">{total.toLocaleString()} créditos</span>
          </div>
          <div className="carrito-actions">
            <button className="carrito-vaciar-btn" onClick={vaciarCarrito}>
              🧹 Vaciar carrito
            </button>
            <button className="carrito-comprar-btn">
              💳 Proceder al pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
