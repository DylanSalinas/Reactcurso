import { createContext, useState } from "react";

// Creamos el contexto global del carrito
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // 🧩 Agregar tanque al carrito
  const agregarAlCarrito = (tanque) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === tanque.id);
      if (existente) {
        return prevCarrito.map((item) =>
          item.id === tanque.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...tanque, cantidad: 1 }];
      }
    });
  };

  // ❌ Eliminar tanque del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
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
