import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { HeaderAdmin } from "./HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "../components/ModalDelete";
import { deleteMenuItem } from "../../../api/menu/menuItemApi";
import { getAllMenuItems } from "../../../api/menu/menuItemApi";
import { useFetch } from "../../../hooks/useFetch";

export function ItemsAdminPage() {
  const itemFetch = useFetch(getAllMenuItems);
  const navigate = useNavigate();

  if (itemFetch.loading)
    return (
      <div className="text-center m-5">
        <Spinner animation="border" role="status">
          Cargando...{" "}
        </Spinner>
      </div>
    );
  if (itemFetch.error)
    return (
      <div className="text-center m-5">
        <Alert variant="danger">{itemFetch.error}</Alert>
      </div>
    );

  const handleConfirmDelete = async () => {
    if (itemFetch.selectedDataId) {
      await deleteMenuItem(itemFetch.selectedDataId);
      itemFetch.setSelectedDataId(null);
      itemFetch.triggerReload();
      navigate("/admin/items");
    }
  };

  return (
    <div className="container mt-4">
      <HeaderAdmin
        title="Productos"
        btnTitle="Crear nuevo Producto"
        endPoint="/admin/items/create"
      />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {itemFetch.data.map((item) => (
          <div className="col" key={item.id}>
            <Card className="h-100 shadow-sm">
              {item.image && (
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>
                  {" "}
                  <h3>{item.name}</h3>
                </Card.Title>
                <Card.Text className="flex-grow-1">
                  <strong>Categoría:</strong> {item.category} <br />
                  <strong>Descripcion:</strong> {item.description} <br />
                  <strong>Precio:</strong> ${" "}
                  {item.price.toLocaleString("es-CO")} <br />
                  <strong>Destacado:</strong> {item.is_featured ? "SÍ" : "NO"}{" "}
                  <br />
                  <strong>En Promoción:</strong>{" "}
                  {item.is_promotion ? "SÍ" : "NO"} <br />
                  <strong>Vegetariano:</strong>{" "}
                  {item.is_vegetarian ? "SÍ" : "NO"} <br />
                  <strong>Estado:</strong>{" "}
                  {item.is_available ? "Activo" : "Inactivo"} <br />
                  <strong>Actualizado:</strong>{" "}
                  {new Date(item.updated_at).toLocaleDateString()} <br />
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/admin/items/edit/${item.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => itemFetch.setSelectedDataId(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <ModalDelete
        show={itemFetch.selectedDataId !== null}
        onHide={() => itemFetch.setSelectedDataId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
