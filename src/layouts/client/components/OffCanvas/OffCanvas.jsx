import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { Avatar } from "./Avatar";
import { LogoutButton } from "./LogoutButton";
import { useState, useEffect } from "react";
import { PaymentModal } from "./PaymentModal";
import { OrderCard } from "./OrderCard";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../../redux/cartSlice";

export function OffCanvas({ show, handleClose, cart, name, removeFromCart }) {
  const [showModal, setShowModal] = useState(false);
  const [showOrderCard, setShowOrderCard] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    if (!show) {
      setShowModal(false);
      setShowOrderCard(false);
      setOrderId(null);
    }
  }, [show]);

  const handlePaymentSuccess = (newOrderId) => {
    setOrderId(newOrderId);
    setShowOrderCard(true);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      scroll={true}
      backdrop={true}
    >
      <Offcanvas.Header closeButton>
        <div className="d-flex align-items-center gap-3">
          <Avatar name={name} />
          <div>
            <h4 className="mb-0 fw-normal fs-3">{name || "Usuario"}</h4>
            <small className="text-muted">Cliente</small>
          </div>
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        {showOrderCard && orderId ? (
          <div className="flex-grow-1">
            <h4 className="mb-4">Detalles de tu Orden</h4>
            <OrderCard orderId={orderId} />
          </div>
        ) : (
          <>
            <div className="flex-grow-1">
              {cart.length === 0 ? (
                <p className="text-muted">Tu carrito está vacío.</p>
              ) : (
                <>
                  <ListGroup>
                    {cart.map((item, index) => (
                      <ListGroup.Item key={index}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-thumbnail me-2"
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                        <span className="fs-5">{item.quantity}</span>{" "}
                        {item.name || 1}
                        <span className="text-success fw-semibold fs-6">
                          ${" "}
                          {(item.price * (item.quantity || 1)).toLocaleString(
                            "es-CO"
                          )}
                        </span>
                        <br />
                        {item.selectedOptions?.length > 0 && (
                          <span className="text-muted">
                            {" "}
                            (Adiciones:{" "}
                            {item.selectedOptions
                              .map((opt) => opt.name)
                              .join(", ")}
                            )
                          </span>
                        )}
                        <Button
                          variant="danger"
                          size="sm"
                          className="float-end"
                          onClick={() => removeFromCart(item)}
                        >
                          Quitar
                        </Button>
                        <div className="clearfix"> </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  {cart.length > 0 && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <strong>Total:</strong>
                        <h3 className="text-danger fw-bold">
                          $
                          {cart
                            .reduce(
                              (total, item) =>
                                total + item.price * (item.quantity || 1),
                              0
                            )
                            .toLocaleString("es-CO")}
                        </h3>
                      </div>
                      <Button
                        variant="warning"
                        className="mt-3 w-100"
                        onClick={() => setShowModal(true)}
                      >
                        Proceder al pago
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-auto pt-3 border-top">
              <LogoutButton />
            </div>
          </>
        )}
      </Offcanvas.Body>

      <PaymentModal
        show={showModal}
        cartItems={cartItems}
        handleClose={() => setShowModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Offcanvas>
  );
}
