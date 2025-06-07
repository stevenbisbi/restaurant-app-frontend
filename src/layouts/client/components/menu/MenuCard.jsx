import { Card } from "react-bootstrap";

export function MenuCard({ item, onSelect }) {
  return (
    <Card
      className="h-100 shadow-sm "
      style={{ cursor: "pointer" }}
      onClick={() => onSelect(item)}
    >
      {item.is_promotion ? (
        <span
          style={{ height: "3rem" }}
          className="position-absolute top-1 end-0 translate-middle-y badge rounded-pill bg-danger d-flex align-items-center"
        >
          <span className="bg-light rounded-circle py-1 me-1 fs-5">💯 </span>
          <span className="fs-5">¡Promoción!</span>
        </span>
      ) : (
        item.is_featured && (
          <span
            style={{ height: "3rem" }}
            className="position-absolute top-1 end-0 translate-middle-y badge rounded-pill bg-warning text-dark d-flex align-items-center"
          >
            <span className="rounded-circle py-1 me-1 fs-5">⭐ </span>{" "}
            <span className="fs-5">¡Destacado!</span>
          </span>
        )
      )}
      <Card.Img
        alt={item.image}
        variant="top"
        src={item.image}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="w-100 text-center">{item.name}</Card.Title>
        <Card.Text className="text-center">
          <span className="text-secondary">{item.description}</span>
        </Card.Text>
        <br />
        <div className="d-flex justify-content-center align-items-center">
          {item.is_promotion ? (
            <div className="d-flex align-items-center gap-2">
              <s>
                <p>$ {item.price.toLocaleString("es-CO")}</p>
              </s>
              <br />
              <div className="text-danger fs-5">
                <h3>$ {(item.price * 0.75).toLocaleString("es-CO")}</h3>
              </div>
            </div>
          ) : (
            <h3>${item.price.toLocaleString("es-CO")}</h3>
          )}
        </div>

        <br />
      </Card.Body>
    </Card>
  );
}
