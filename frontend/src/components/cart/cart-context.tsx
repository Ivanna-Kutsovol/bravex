"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  shortDescription: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "bravex-cart";

const CartContext = createContext<CartContextValue | null>(null);

type StoredCartItem = Partial<CartItem> & {
  description?: string;
};

function normalizeShortDescription(item: StoredCartItem) {
  if (typeof item.shortDescription === "string" && item.shortDescription.trim()) {
    return item.shortDescription.trim();
  }

  if (typeof item.description === "string" && item.description.trim()) {
    return item.description.trim();
  }

  return "Selected product from BRAVEX catalog.";
}

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .map((item): CartItem | null => {
        if (!item || typeof item !== "object") {
          return null;
        }

        const storedItem = item as StoredCartItem;

        if (
          typeof storedItem.id !== "number" ||
          typeof storedItem.name !== "string" ||
          typeof storedItem.price !== "number" ||
          typeof storedItem.imageUrl !== "string"
        ) {
          return null;
        }

        return {
          id: storedItem.id,
          name: storedItem.name,
          shortDescription: normalizeShortDescription(storedItem),
          price: storedItem.price,
          imageUrl: storedItem.imageUrl,
          quantity:
            typeof storedItem.quantity === "number" && storedItem.quantity > 0
              ? storedItem.quantity
              : 1,
          size: typeof storedItem.size === "string" ? storedItem.size : "Standard",
        };
      })
      .filter((item): item is CartItem => item !== null);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readCartFromStorage());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [isHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          return currentItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          );
        }

        return [...currentItems, { ...item, quantity }];
      });
    };

    const removeItem = (id: number) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
      setItems([]);
    };

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
