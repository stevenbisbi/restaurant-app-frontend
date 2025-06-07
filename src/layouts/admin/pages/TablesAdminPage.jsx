import { useState, useEffect } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { deleteTable } from "../../../api/tablesApi";
import { HeaderAdmin } from "./HeaderAdmin";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate, Link } from "react-router-dom";
import { ModalDelete } from "../components/ModalDelete";
import { getAllTables } from "../../../api/tablesApi";
import { getAllRestaurants } from "../../../api/restaurantsApi";

export function TablesAdminPage() {
  const tableFetch = useFetch(getAllTables);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllTables().then(tableFetch.triggerReload);
    getAllRestaurants().then((res) => setRestaurants(res.data));
  }, []);

  const getRestaurantName = (id) => {
    const found = restaurants.find((r) => r.id === id);
    return found ? found.name : "Sin asignar";
  };

  if (tableFetch.loading)
    return (
      <div className="text-center m-5">
        <Spinner animation="border" role="status">
          Cargando...{" "}
        </Spinner>
      </div>
    );
  if (tableFetch.error)
    return (
      <div className="text-center m-5">
        <Alert variant="danger">{tableFetch.error}</Alert>
      </div>
    );

  const handleConfirmDelete = async () => {
    if (tableFetch.selectedDataId) {
      await deleteTable(tableFetch.selectedDataId);
      tableFetch.setSelectedDataId(null);
      tableFetch.triggerReload();
      navigate("/admin/tables");
    }
  };

  return (
    <>
      <HeaderAdmin
        title="Mesas"
        btnTitle="Crear nueva Mesa"
        endPoint="/admin/tables/create"
      />

      <h5 className="text-center">🟢Disponible 🟠Reservado 🔴Ocupado</h5>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr className="text-center">
              <th>Numero</th>
              <th>Capacidad</th>
              <th>Ubicacion</th>
              <th>Estado</th>
              <th>Restaurante</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {tableFetch.data.map((table) => (
              <tr key={table.id}>
                <td>{table.number}</td>
                <td>{table.capacity}</td>
                <td>{table.location}</td>
                <td>
                  {table.status === "Reserved"
                    ? "🟠"
                    : table.status === "Available"
                    ? "🟢"
                    : "🔴"}
                </td>
                <td>{getRestaurantName(table.restaurant) || "Sin asignar"}</td>
                <td>{new Date(table.created_at).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate(`/admin/tables/edit/${table.id}`)}
                    className="mx-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => tableFetch.setSelectedDataId(table.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalDelete
        show={tableFetch.selectedDataId !== null}
        onHide={() => tableFetch.setSelectedDataId(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
