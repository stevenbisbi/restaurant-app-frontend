import { Card } from "react-bootstrap";
import { useMenus } from "../hooks/useMenus";

export function MenuCard1({ item, onSelect }) {
  const { menus, loading, error } = useMenus();

  if (loading) return <p>Cargando menús...</p>;
  if (error) return <p>Error cargando menús 😢</p>;
  return (
    <Card
      className="p-2 mx-2 position-relative"
      style={{ cursor: "pointer", width: "16rem" }}
      onClick={() => onSelect(item)}
    >
      {menuItem.is_promotion ? (
        <span
          style={{ height: "2rem" }}
          className="position-absolute top-1 end-0 translate-middle-y badge rounded-pill bg-danger d-flex align-items-center"
        >
          <span className="bg-light rounded-circle py-1 me-1">💯 </span>
          ¡Promoción!
        </span>
      ) : (
        menuItem.is_featured && (
          <span
            style={{ height: "2rem" }}
            className="position-absolute top-1 end-0 translate-middle-y badge rounded-pill bg-warning text-dark d-flex align-items-center"
          >
            <span className="bg-light rounded-circle py-1 me-1">⭐ </span>{" "}
            ¡Destacado!
          </span>
        )
      )}
      <Card.Img alt={item.image} variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <strong>Precio: </strong> $ {item.price}
          <strong>Descripción: </strong> {item.description || "Sin descripción"}
          <strong>Categoria: </strong> {item.category || "Sin asignar"}
          <strong>Creado: </strong> <p>vegatarian: </p>{" "}
          {item.is_vegetarian ? "✅" : "❌"}
          <p>Promocionado: </p> {item.is_promotion ? "✅" : "❌"}
          <p>Destacado: </p> {item.is_featured ? "✅" : "❌"}
          {new Date(item.created_at).toLocaleDateString()}
          <strong>Activo:</strong> {item.is_active ? "✅" : "❌"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
