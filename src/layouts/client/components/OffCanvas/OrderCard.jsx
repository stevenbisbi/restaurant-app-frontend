import { useEffect, useState } from "react";
import { useOrderSocket } from "../../../../hooks/useOrderSocket";
import axiosClient from "../../../../api/axiosClient"; // tu instancia Axios configurada

export function OrderCard({ orderId }) {
  const [order, setOrder] = useState(null); // ← Guardamos toda la orden
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { socketReady, sendStatus } = useOrderSocket(orderId, (newStatus) => {
    // Actualizamos solo el status dentro de la orden
    setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        console.log(orderId);
        const response = await axiosClient.get(`/orders/order/${orderId}/`);
        setOrder(response.data); // ← Guardamos toda la orden
      } catch (err) {
        console.error("Error al obtener orden:", err);
        setError("No se pudo cargar la información de la orden.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p>Cargando orden…</p>;
  }
  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  return (
    <div className="container py-4">
      <h4>Orden #{orderId}</h4>
      <p>
        <strong>Cliente:</strong> {order.customer || "Anonino"}
      </p>
      <p>
        <strong>Camarero:</strong> {order.staff || "No asignado"}
      </p>
      <p>
        <strong>Estado actual: </strong>
        <em>
          {order.status === "Preparando" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="mx-3"
              >
                <path
                  fill="#9d330d"
                  d="M22.53 10.1a8 8 0 0 0-2.43-5.64a1 1 0 0 0-1-.19a1 1 0 0 0-.63.84A1.35 1.35 0 0 1 17 6.31a4.39 4.39 0 0 1-.87-4.82a1 1 0 0 0-.9-1.49c-4.31 0-7.55 2.41-8.5 6.21a1.53 1.53 0 0 1-1-1.15a1 1 0 0 0-1.63-.62A7.41 7.41 0 0 0 1.53 11a6.35 6.35 0 0 0 3.15 4.7a.25.25 0 0 0 .22 0a.24.24 0 0 0 .15-.16a7.7 7.7 0 0 1 .54-1.36a.25.25 0 0 0-.08-.33a4.33 4.33 0 0 1-2-3.12A5.43 5.43 0 0 1 4.46 7a3.68 3.68 0 0 0 3.17 1.3a1 1 0 0 0 .89-.86a6 6 0 0 1 5.29-5.33a6.35 6.35 0 0 0 2.26 6a1 1 0 0 0 .5.17a3.56 3.56 0 0 0 3.1-1.21a5.87 5.87 0 0 1 .86 3a3.92 3.92 0 0 1-1.46 3.17a.25.25 0 0 0-.05.33a8 8 0 0 1 .66 1.32a.26.26 0 0 0 .17.15a.26.26 0 0 0 .21 0a5.91 5.91 0 0 0 2.47-4.94"
                />
                <path
                  fill="#9d330d"
                  d="M18.73 17.75A6.25 6.25 0 1 0 12.48 24a6.26 6.26 0 0 0 6.25-6.25m-2.45 0a.75.75 0 0 1-.75.75h-3a.76.76 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v2.5a.25.25 0 0 0 .25.25h2a.75.75 0 0 1 .75.75"
                />
              </svg>
              Preparando
            </>
          ) : order.status === "Lista" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 16 16"
                className="mx-3"
              >
                <path
                  fill="#f0e614"
                  d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16M3 5a5 5 0 0 1 10 0v2.947q0 .076.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.516 1.516 0 0 1-1.263-2.36l1.703-2.554A.26.26 0 0 0 3 7.947Zm5-3.5A3.5 3.5 0 0 0 4.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556l-.003.01l.001.006q0 .003.004.006l.006.004l.007.001h10.964l.007-.001l.006-.004l.004-.006l.001-.007l-.003-.01l-1.703-2.554a1.75 1.75 0 0 1-.294-.97V5A3.5 3.5 0 0 0 8 1.5"
                />
              </svg>
              Lista
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 48 48"
                className="mx-3"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="4"
                >
                  <path d="M24 44c9.389 0 17-7.611 17-17s-7.611-17-17-17S7 17.611 7 27s7.611 17 17 17Z" />
                  <path
                    stroke-linecap="round"
                    d="M18 4h12m-6 15v8m8 0h-8m0-23v4"
                  />
                </svg>
              </svg>
              En espera
            </>
          )}
        </em>
      </p>
      {socketReady ? (
        <p className="text-success">WebSocket conectado.</p>
      ) : (
        <p className="text-warning">Conectando vía WebSocket…</p>
      )}
    </div>
  );
}
