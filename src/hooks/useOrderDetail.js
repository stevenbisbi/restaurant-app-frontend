import { useCallback, useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { getOrder, deleteOrder } from "../api/orderApi";
import { useOrderSocket } from "./useOrderSocket";

export function useOrderDetail(orderId) {
  const [order, setOrder] = useState(null);

  const fetchOrder = useCallback(() => getOrder(orderId), [orderId]);

  const { data, loading, error } = useFetch(fetchOrder); // sin [fetchOrder] en dependencia

  const { socketReady, sendStatus } = useOrderSocket(orderId, (newStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
  });

  useEffect(() => {
    if (data) {
      setOrder(data);
    }
  }, [data]);

  const changeStatus = (newStatus) => {
    sendStatus(newStatus);
    setOrder((prev) => ({ ...prev, status: newStatus }));
  };

  const removeOrder = async () => {
    try {
      await deleteOrder(orderId);
      setOrder(null);
    } catch (err) {
      console.error("Error al eliminar la orden:", err);
    }
  };

  return {
    order,
    loading,
    error,
    socketReady,
    changeStatus,
    removeOrder,
  };
}
