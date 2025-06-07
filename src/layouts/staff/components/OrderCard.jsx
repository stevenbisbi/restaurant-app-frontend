import { Card, Button } from "react-bootstrap";
import { useOrderDetail } from "../../../hooks/useOrderDetail";

export function OrderCard({ orderObject }) {
  const { order, loading, error, changeStatus, socketReady, removeOrder } =
    useOrderDetail(orderObject.id);

  console.log("order", orderObject);
  if (loading || !order) return <p>Cargando orden…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card className="m-1 p-3 h-100 shadow-sm">
      <h5>Orden #{orderObject.id}</h5>
      <p>
        <strong>Estado:</strong> {order.status}
      </p>
      <p>
        <strong>Cliente:</strong> {order.client || "Anónimo"}
      </p>
      <p>
        <strong>Camarero:</strong> {order.waiter || "No asignado"}
      </p>
      <p>
        {socketReady
          ? "🟢 Conectado via WebSocket"
          : "🟡 Conectando vía WebSocket…"}
      </p>

      <div className="col">
        <div className="d-flex justify-content-between">
          <Button
            variant={
              order.status === "Preparando" ? "primary" : "outline-primary"
            }
            onClick={() => changeStatus("Preparando")}
          >
            Preparando
          </Button>
          <Button
            variant={order.status === "Lista" ? "success" : "outline-success"}
            onClick={() => changeStatus("Lista")}
          >
            Listo
          </Button>
          <Button
            variant={
              order.status === "En espera" ? "secondary" : "outline-secondary"
            }
            onClick={() => changeStatus("En espera")}
          >
            En espera
          </Button>
        </div>

        <div className="d-flex justify-content-center">
          <Button
            variant="danger"
            onClick={removeOrder}
            className="mt-2 text-center"
          >
            Finalizar
          </Button>
        </div>
      </div>
    </Card>
  );
}
