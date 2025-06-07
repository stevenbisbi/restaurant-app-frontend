import { useEffect, useRef, useState } from "react";

// Recibe el orderId (string) y un callback que se ejecuta cada vez que llegue un mensaje nuevo.
export function useOrderSocket(orderId, onStatusChange) {
  const [socketReady, setSocketReady] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!orderId) return;

    // Cambia esto si usas WSS en producción
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${protocol}://localhost:8000/ws/orders/${orderId}/`;

    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket conectado para order:", orderId);
      setSocketReady(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const newStatus = data.status;
        // Llamamos al callback para notificar al componente que el estado cambió
        if (typeof onStatusChange === "function") {
          onStatusChange(newStatus);
        }
      } catch (err) {
        console.error("Error parsing WS message:", err);
      }
    };

    socket.onclose = (e) => {
      console.log("WebSocket cerrado:", e.code, e.reason);
      setSocketReady(false);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    // Al desmontar el componente, cerramos la conexión
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [orderId]);

  // Función para enviar un nuevo estado (status) al backend
  const sendStatus = (statusName) => {
    if (
      socketReady &&
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN
    ) {
      const payload = JSON.stringify({ status: statusName });
      wsRef.current.send(payload);
    } else {
      console.warn("WebSocket no está listo. No se puede enviar status.");
    }
  };

  return { socketReady, sendStatus };
}
