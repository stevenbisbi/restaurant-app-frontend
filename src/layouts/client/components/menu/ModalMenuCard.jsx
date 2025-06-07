import { Modal, Button, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../../redux/cartSlice";

export function ModalMenuCard({ item, show, onHide }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleClose = () => {
    setSelectedOptions([]);
    setQuantity(1);
  };

  const toggleOption = (option) => {
    setSelectedOptions((prevSelected) => {
      const exists = prevSelected.find((opt) => opt.id === option.id);
      if (exists) {
        return prevSelected.filter((opt) => opt.id !== option.id);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      dialogClassName="modal-horizontal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{item?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="container-fluid p-2">
        <div className="row">
          <div className=" col-md-12 d-flex justify-content-center align-items-center mb-3 mb-md-0">
            <img
              src={item?.image}
              className="img-fluid rounded"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
              alt={item?.name}
            />
          </div>
          <div
            className="col-12 p-3 text-center overflow-y-auto"
            style={{ maxHeight: "70vh" }}
          >
            <p>
              <strong>Descripción:</strong>
            </p>
            <p className="text-muted">{item?.description}</p>

            {Array.isArray(item?.options) && item.options.length > 0 ? (
              <>
                <p>
                  <strong>Adiciones</strong>
                </p>
                <div className="d-flex flex-wrap justify-content-center">
                  {item.options.map((opt) => (
                    <Button
                      key={opt.id}
                      onClick={() => toggleOption(opt)}
                      variant={
                        selectedOptions.some((o) => o.id === opt.id)
                          ? "primary"
                          : "outline-secondary"
                      }
                      className="m-1 d-flex align-items-center"
                    >
                      {opt.image_url && (
                        <img
                          src={opt.image_url}
                          alt={opt.name}
                          className="me-2"
                          style={{ width: "30px" }}
                        />
                      )}
                      {opt.name}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted">Sin opciones</p>
            )}

            <Row className="d-flex justify-content-center">
              <Button variant="danger" className="col-5 m-1">
                $1000 Personal
              </Button>
              <Button variant="danger" className="col-5 m-1">
                $1000 Pareja
              </Button>
            </Row>
            <Row className="d-flex justify-content-center">
              <Button variant="danger" className="col-5 m-1">
                $1000 Mediana
              </Button>
              <Button variant="danger" className="col-5 m-1">
                $1000 Familiar
              </Button>
            </Row>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between align-items-center">
        {item?.is_promotion ? (
          <div className="d-flex align-items-center gap-3">
            <s className="text-dark my-auto">$ {item?.price * quantity}</s>
            <p className="text-danger fs-5 my-auto">
              $ {(item?.price * 0.75 * quantity).toLocaleString("es-CO")}
            </p>
          </div>
        ) : (
          <p>$ {(item?.price * quantity).toLocaleString("es-CO")}</p>
        )}

        <div>
          <Button
            onClick={handleDecrement}
            variant="light"
            className="rounded-circle shadow-sm me-2"
            style={{ width: "40px", height: "40px" }}
          >
            <strong>-</strong>
          </Button>
          <span className="fs-5">{quantity}</span>
          <Button
            onClick={handleIncrement}
            variant="light"
            className="rounded-circle shadow-sm ms-2"
            style={{ width: "40px", height: "40px" }}
          >
            <strong>+</strong>
          </Button>

          <Button
            variant="warning"
            onClick={() => {
              if (quantity <= 0) return;

              dispatch(
                addItemToCart({ item: { ...item, selectedOptions }, quantity })
              );

              handleClose();
              onHide();
            }}
          >
            Agregar al carrito
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
