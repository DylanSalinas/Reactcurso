import { useContext } from "react";
import { CartContext } from "./CartContext"; // ajustá la ruta si está en otra carpeta

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

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
          <li key={item.id} className="carrito-item">
            <img src={item.image} alt={item.name} width="80" />
            <div>
              <h3>{item.name}</h3>
              <p>
                Tier: {item.tier} | Nación: {item.nation}
              </p>
              <p>Precio: {item.precio.toLocaleString()} créditos</p>
              <p>Cantidad: {item.cantidad}</p>
            </div>
            <button onClick={() => eliminarDelCarrito(item.id)}>❌ Quitar</button>
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
