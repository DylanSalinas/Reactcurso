import { useContext } from "react";
import { CartContext } from "../componentes/CartContext"; 

function TankCard({ tank, precio }) {
  const { agregarAlCarrito } = useContext(CartContext);

  if (!tank) return null;

  const imageUrl = tank.images?.large || tank.images?.small_icon || tank.image || "https://placehold.co/180x180";

  const producto = {
    tank_id: tank.tank_id,
    name: tank.name,
    image: imageUrl,
    tier: tank.tier,
    nation: tank.nation,
    type: tank.type,
    precio,
  };

  const manejarClick = () => {
    agregarAlCarrito(producto);
  };

  return (
    <div className="card">

      {/* ✅ Imagen bien arriba */}
      <img src={imageUrl} alt={tank.name} className="tank-img" />

      <h3>{tank.name}</h3>
      <p><strong>Nación:</strong> {tank.nation}</p>
      <p><strong>Tipo:</strong> {tank.type}</p>
      <p><strong>Tier:</strong> {tank.tier}</p>
      <p><strong>Precio estimado:</strong> {precio?.toLocaleString() || 0} créditos</p>
      <button onClick={manejarClick}>Añadir al carrito</button>

    </div>
  );
}

export default TankCard;
