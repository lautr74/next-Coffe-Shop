"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import api from "../lib/api";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  quantity: number;
  userId: string;
  productId: string;
  variantId: string;
  product: {
    name: string;
    image?: string;
  };
  variant?: {
    price: number;
    weight: number;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, variantId: string) => Promise<void>;
  decreaseQuantity: (variantId: string) => Promise<void>;
  removeFromCart: (variantId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  loading: boolean;
  clearLocalCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const cartRef = useRef<CartItem[]>([]);
  const userId = user?.id;

  const mergeCartItem = (
    currentItem: CartItem,
    updatedItem: Partial<CartItem>,
  ) =>
    ({
      ...currentItem,
      ...updatedItem,
      product: updatedItem.product ?? currentItem.product,
      variant: updatedItem.variant ?? currentItem.variant,
    }) as CartItem;

  // 1. Cargar el carrito desde el Backend (Supabase) al iniciar o cambiar de usuario
  useEffect(() => {
    if (authLoading) return;

    const fetchCart = async () => {
      if (user) {
        try {
          setLoading(true);
          const res = await api.get("/cart");
          setCart(res.data);
        } catch (error) {
          console.error("Error al obtener el carrito del servidor", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCart([]);
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, authLoading]);

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  // 2. Añadir al carrito (Sincronizado con Backend)
  const addToCart = useCallback(
    async (productId: string, variantId: string) => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const res = await api.post("/cart/add", {
          variantId,
          productId,
          quantity: 1,
        });
        const updatedItem = res.data;

        setCart((prev) => {
          const exists = prev.find((item) => item.variantId === variantId);
          if (exists) {
            return prev.map((item) =>
              item.variantId === variantId
                ? mergeCartItem(item, updatedItem)
                : item,
            );
          }
          return [...prev, updatedItem];
        });
      } catch (error) {
        console.error("No se pudo añadir el producto", error);
      }
    },
    [user, router],
  );

  // 3. Eliminar del carrito
  const removeFromCart = useCallback(async (variantId: string) => {
    try {
      await api.delete(`/cart/${variantId}`);
      setCart((prev) => prev.filter((item) => item.variantId !== variantId));
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  }, []);

  // 4. Restar cantdidad
  const decreaseQuantity = useCallback(async (variantId: string) => {
    try {
      // 3. Llamamos al endpoint de restar
      const res = await api.post("/cart/decrease", { variantId, quantity: 1 });
      const updatedItem = res.data;

      // 4. Actualizamos el estado de React
      setCart((prev) => {
        if (!updatedItem || updatedItem.quantity <= 0) {
          return prev.filter((item) => item.variantId !== variantId);
        }

        return prev.map((item) =>
          item.variantId === variantId
            ? mergeCartItem(item, updatedItem)
            : item,
        );
      });
    } catch (error) {
      console.error("Error al restar cantidad", error);
    }
  }, []);
  // 5. Limpiar carrito
  const clearCart = useCallback(async () => {
    const currentCart = [...cartRef.current];
    setCart((prev) => (prev.length > 0 ? [] : prev));

    if (!userId || currentCart.length === 0) return;

    try {
      await Promise.all(
        currentCart.map((item) => api.delete(`/cart/${item.variantId}`)),
      );
    } catch (error) {
      console.error("Error al limpiar carrito", error);
      setCart(currentCart);
    }
  }, [userId]);

  //6. Limpiar carrito local
  const clearLocalCart = useCallback(() => {
    setCart((prev) => (prev.length > 0 ? [] : prev));
  }, []);

  // Cálculo del total
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + (item.variant?.price ?? 0) * item.quantity,
      0,
    );
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      clearCart,
      totalPrice,
      loading,
      clearLocalCart,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      clearCart,
      totalPrice,
      loading,
      clearLocalCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
