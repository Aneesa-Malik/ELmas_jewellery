import { createContext, useContext, useEffect, useState } from "react";
import { load, save } from "./storage.js";

const CartContext = createContext(null);
const CART_KEY = "elmas_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load(CART_KEY, []));

  useEffect(() => {
    save(CART_KEY, items);
  }, [items]);

  // Equivalent of cart.php?action=add
  function addItem(id, name, price, qty = 1) {
    const quantity = Math.max(1, parseInt(qty, 10) || 1);
    const key = `${id}_${name}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { key, id, name, price: Number(price) || 0, quantity }];
    });
  }

  // Equivalent of cart.php?action=remove
  function removeItem(key) {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
