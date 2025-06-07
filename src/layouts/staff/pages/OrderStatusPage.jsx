import { useFetch } from "../../../hooks/useFetch";
import { getAllOrders } from "../../../api/orderApi";
import { OrderCard } from "../components/OrderCard";

export function OrderStatusPage() {
  const { data: orders, loading, error } = useFetch(getAllOrders);

  if (loading) return <p>Cargando órdenes…</p>;
  if (error) return <p>Error al cargar: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Órdenes Activas</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {orders.map((orderObject) => (
          <div className="col" key={orderObject.id}>
            <OrderCard orderObject={orderObject} />
          </div>
        ))}
      </div>
    </div>
  );
}
