import { createContext, useState } from "react";

// Contexto global 🛒
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // 🧩 Agregar tanque al carrito
  const agregarAlCarrito = (tanque) => {
    if (!tanque) return;

    const id = tanque.tank_id; // ✅ usamos la ID correcta de :contentReference[oaicite:0]{index=0}

    setCarrito((prev) => {
      const existe = prev.find((item) => item.tank_id === id);

      if (existe) {
        return prev.map((item) =>
          item.tank_id === id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }

      // Si no existe todavía lo agregamos
      return [
        ...prev,
        {
          tank_id: id,
          name: tanque.name || "Tanque desconocido",
          nation: tanque.nation || "?",
          tier: tanque.tier ?? "?",
          type: tanque.type || "?",
          image: tanque.images?.small_icon || tanque.image || "",
          precio: tanque.precio ?? tanque.precioPorTier ?? 0,
          cantidad: 1,
        },
      ];
    });
  };

  // ❌ Eliminar del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.tank_id !== id));
  };

  // 🧹 Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Agregamos alias opcional por si en algún import lo llaman así:
export default CartProvider;
