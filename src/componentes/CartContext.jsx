import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (tanque) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.tank_id === tanque.tank_id);

      if (existente) {
        return prev.map((item) =>
          item.tank_id === tanque.tank_id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prev, { ...tanque, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (tank_id) =>
    setCarrito((prev) => prev.filter((item) => item.tank_id !== tank_id));

  const actualizarCantidad = (tank_id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(tank_id);
      return;
    }
    setCarrito((prev) =>
      prev.map((item) =>
        item.tank_id === tank_id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
};
