import { useState, useEffect } from "react";
import type { CartItem } from "../components/types";

const ORDER_HISTORY_KEY = "order_history";

export default function useOrderHistory() {
  const [history, setHistory] = useState<CartItem[][]>([]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem(ORDER_HISTORY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setHistory(parsed);
      setIndex(parsed.length - 1);
    }
  }, []);

  const saveOrder = (order: CartItem[]) => {
    const updated = [...history, order].slice(-10);
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(updated));
    setHistory(updated);
    setIndex(updated.length - 1);
  };

  const goBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goForward = () => {
    if (index < history.length - 1) setIndex(index + 1);
  };

  const currentOrder = history[index] || [];

  return {
    currentOrder,
    index,
    totalOrders: history.length,
    saveOrder,
    goBack,
    goForward,
  };
}
