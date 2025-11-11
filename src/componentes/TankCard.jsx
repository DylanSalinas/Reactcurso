import { useContext } from "react";
import { CartContext } from "./CartContext";

function TankCard({ tank, precio }) {
  const { agregarAlCarrito } = useContext(CartContext);

  if (!tank) return null; // 🧱 Previene errores si el tanque no existe

  const imageUrl = tank?.images?.small_icon || "https://placehold.co/100x100";
  const name = tank?.name || "Tanque desconocido";
  const nation = tank?.nation || "Desconocida";
  const type = tank?.type || "Sin tipo";
  const tier = tank?.tier || "?";

  const manejarClick = () => {
    const producto = {
      id: tank.tank_id || Date.now(),
      name,
      image: imageUrl,
      tier,
      nation,
      type,
      precio: precio || 0,
    };
    agregarAlCarrito(producto);
  };

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p><strong>Nación:</strong> {nation}</p>
      <p><strong>Tipo:</strong> {type}</p>
      <p><strong>Tier:</strong> {tier}</p>
      <p><strong>Precio estimado:</strong> {precio?.toLocaleString() || 0} créditos</p>
      <button onClick={manejarClick}>Añadir al carrito</button>
    </div>
  );
}

export default TankCard;
