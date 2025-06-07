import { HeaderAdmin } from "./HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { useFetch } from "../../../hooks/useFetch";
import { getAllOrders } from "../../../api/orderApi";
import { deleteOrder } from "../../../api/orderApi";
import { ModalDelete } from "../components/ModalDelete";

export function OrderAdminPage() {
  const orderFetch = useFetch(getAllOrders);
  console.log("data?", orderFetch.data);

  const navigate = useNavigate();
  const handleConfirmDelete = async () => {
    if (orderFetch.selectedDataId) {
      await deleteOrder(orderFetch.selectedDataId);
      orderFetch.setSelectedDataId(null);
      orderFetch.triggerReload();
      navigate("/admin/items");
    }
  };

  if (orderFetch.loading)
    return (
      <div className="text-center m-5">
        <Spinner animation="border" role="status">
          Cargando...{" "}
        </Spinner>
      </div>
    );
  if (orderFetch.error)
    return (
      <div className="text-center m-5">
        <Alert variant="danger">{orderFetch.error}</Alert>
      </div>
    );

  return (
    <div>
      <HeaderAdmin title="Order Management" />
      <div className="container">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>Mesa</th>
                <th>Mesero</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((order) => (
                <tr key={order.id}>
                  <td className="text-center">
                    {order.customer ? "✅" : "❌"}
                  </td>
                  <td>{order.table}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link
                      to={`/admin/order/edit/${order.id}`}
                      className="btn btn-sm btn-outline-secondary mx-1"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger mx-1"
                      data-bs-toggle="modal"
                      data-bs-target="#DeleteModal"
                      onClick={() => handleDeleteClick(order.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
        <ModalDelete onConfirm={handleConfirmDelete} />
      </div>
    </div>
  );
}
