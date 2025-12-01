import { useContext } from "react";
import { CartContext } from "../componentes/CartContext";

function TankCard({ tank, precio }) {
  const { agregarAlCarrito } = useContext(CartContext);
  if (!tank) return null;

  const imageUrl = tank.images?.small_icon || tank.image || "https://placehold.co/100x100";
  const name = tank.name || "Tanque desconocido";
  const nation = tank.nation || "Desconocida";
  const type = tank.type || "Sin tipo";
  const tier = tank.tier ?? "?";

  const manejarClick = () => {
    agregarAlCarrito({
      id: tank.tank_id,
      name,
      image: imageUrl,
      tier,
      nation,
      type,
      precio: precio || 0,
      cantidad: 1,
    });
  };

  return (
    <div
      className="
        w-64 bg-white rounded-2xl shadow-md
        p-4 flex flex-col items-center text-center
        border border-gray-200
        transition hover:shadow-xl hover:scale-[1.02]
      "
    >
      {/* Contenedor más grande para la imagen */}
      <div className="w-40 h-40 flex items-center justify-center overflow-hidden bg-gray-50 rounded-xl mb-3">
        <img
          src={imageUrl}
          alt={name}
          className="max-w-full max-h-full object-contain scale-110"
        />
      </div>

      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-gray-600"><strong>Tier:</strong> {tier}</p>
      <p className="text-sm text-gray-600"><strong>Nación:</strong> {nation}</p>
      <p className="text-sm text-gray-600"><strong>Tipo:</strong> {type}</p>

      <p className="mt-2 text-lg font-semibold">
        {precio?.toLocaleString() || 0} créditos
      </p>

      <button
        onClick={manejarClick}
        className="
          mt-3 bg-black text-white px-4 py-2 rounded-xl text-sm
          hover:bg-gray-900 transition
        "
      >
        Añadir al carrito
      </button>
    </div>
  );
}

export default TankCard;
